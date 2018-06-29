import {NotificationEvent, NotificationManager, NotificationManagerInterface} from './index';

type DataType = { key: string };

class TestError {
}

const getNotificationManager = (): NotificationManagerInterface<string, DataType> => {
    const notMan = new NotificationManager<string, DataType>();
    notMan.setLogger({
        warn: () => {
            // noop
        },
        log: () => {
            // noop
        }
    });

    notMan.setErrorHandler((event, error) => {
        if (error instanceof TestError) {
            // This is called from the test to check if ordinary errors are ignored
            return;
        }

        throw error;
    });

    return notMan;
};

it('register', () => {
    const mockCallback = jest.fn();
    const nm = getNotificationManager();

    nm.register('testEvent', mockCallback);
});

it('notify', (done: Function) => {
    expect.assertions(3);
    const nm = getNotificationManager();

    nm.register('testEvent', (event) => {
        expect(event).toBeInstanceOf(NotificationEvent);
        expect(event.data).toBeDefined();
        if (event.data) {
            expect(event.data.key).toBe('hello');
        }
        done();
    });
    nm.notify('testEvent', {key: 'hello'});
});

it('notifySync', () => {
    const nm = getNotificationManager();

    (function () {
        const mockCallback = jest.fn();

        nm.register('testEvent', mockCallback);
        nm.notifySync('testEvent', {key: 'hello'});

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBeInstanceOf(NotificationEvent);
    })();
    (function () {
        const mockCallback = jest.fn();

        nm.register('testEvent', mockCallback);
        nm.notifySync('testEvent', {key: 'hello'});
        nm.notifySync('testEvent', {key: 'hello'});

        expect(mockCallback.mock.calls.length).toBe(2);
        expect(mockCallback.mock.calls[0][0]).toBeInstanceOf(NotificationEvent);
    })();
});

it('must ignore exceptions (sync)', () => {
    expect.assertions(2);
    const nm = getNotificationManager();

    nm.register('testEvent', () => {
        throw new TestError();
    });

    const mockCallback = jest.fn();

    nm.register('testEvent', mockCallback);
    nm.notifySync('testEvent', {key: 'hello'});

    // mockCallback must still have been called
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBeInstanceOf(NotificationEvent);
});

it('must ignore exceptions (async)', (done) => {
    expect.assertions(3);
    const nm = getNotificationManager();

    nm.register('testEvent', () => {
        throw new TestError();
    });

    nm.register('testEvent', (event) => {
        expect(event).toBeInstanceOf(NotificationEvent);
        expect(event.data).toBeDefined();
        if (event.data) {
            expect(event.data.key).toBe('hello');
        }
        done();
    });

    nm.notify('testEvent', {key: 'hello'});
});

it('must ignore re-registers', (done) => {
    const nm = getNotificationManager();

    let hasBeenCalled = false;

    const callback = (event: NotificationEvent<string, DataType>) => {
        expect(event).toBeInstanceOf(NotificationEvent);
        expect(event.data).toBeDefined();
        if (event.data) {
            expect(event.data.key).toBe('hello');
        }
        expect(hasBeenCalled).toBe(false);
        hasBeenCalled = true;
        done();
    };
    nm.register('testEvent', callback);
    nm.register('testEvent', callback);
    nm.register('testEvent', callback);

    nm.notify('testEvent', {key: 'hello'});
});

const setupMustAllowCallbackReuse = (done: Function): NotificationManagerInterface<string, DataType> => {
    expect.assertions(2);
    const nm = getNotificationManager();

    let testEvent1Called = false;
    let testEvent2Called = false;

    const callback = (event: NotificationEvent<string, DataType>) => {
        expect(event).toBeInstanceOf(NotificationEvent);
        if (event.data && event.data.key === 'testEvent1Data') {
            testEvent1Called = true;
        }
        if (event.data && event.data.key === 'testEvent2Data') {
            testEvent2Called = true;
        }

        if (testEvent1Called && testEvent2Called) {
            done();
        }
    };
    nm.register('testEvent1', callback);
    nm.register('testEvent2', callback);

    return nm;
};

it('must allow to use a callback for different events (async)', (done: Function) => {
    const nm = setupMustAllowCallbackReuse(done);

    nm.notify('testEvent1', {key: 'testEvent1Data'});
    nm.notify('testEvent2', {key: 'testEvent2Data'});
});

it('must allow to use a callback for different events (sync)', (done: Function) => {
    const nm = setupMustAllowCallbackReuse(done);

    nm.notifySync('testEvent1', {key: 'testEvent1Data'});
    nm.notifySync('testEvent2', {key: 'testEvent2Data'});
});
