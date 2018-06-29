import {NotificationManagerInterface} from './NotificationManagerInterface';
import {NotificationEvent} from './NotificationEvent';

type ErrorHandler<T, D extends object> = (event: NotificationEvent<T, D>, error: any) => void;

interface LoggerInterface {
    log: Function;
    warn: Function;
}

export class NotificationManager<T, D extends object> implements NotificationManagerInterface<T, D> {
    private _errorHandler: ErrorHandler<T, D>;
    private readonly _listeners: Map<T, Array<(event: NotificationEvent<T, D>) => void>>;
    private _logger: LoggerInterface;

    constructor() {
        this._listeners = new Map();
        this.register = this.register.bind(this);
        this.notify = this.notify.bind(this);
        this.notifySync = this.notifySync.bind(this);

        this._logger = (window || global).console;

        this._errorHandler = () => {
            // noop
        };
    }

    notify(eventType: T, data?: D): NotificationManagerInterface<T, D> {
        setTimeout(() => this.notifySync(eventType, data), 0);

        return this;
    }

    notifySync(eventType: T, data?: D): NotificationManagerInterface<T, D> {
        const collection = this._listeners.get(eventType);
        if (typeof collection === 'undefined') {
            return this;
        }

        const errorHandler = this._errorHandler;
        const event = new NotificationEvent(eventType, data);
        collection.forEach((callback) => {
            try {
                callback(event);
            } catch (error) {
                errorHandler(event, error);
            }
        });

        return this;
    }

    register(
        eventType: T,
        callback: (event: NotificationEvent<T, D>) => void
    ): NotificationManagerInterface<T, D> {
        const collection = this._listeners.get(eventType);
        if (typeof collection !== 'undefined') {
            if (collection.indexOf(callback) >= 0) {
                this.warn('Callback is already registered');

                return this;
            }
            collection.push(callback);
        } else {
            this._listeners.set(eventType, [callback]);
        }

        return this;
    }

    /**
     * [INTERNAL] Set a custom error handler
     *
     * @internal
     * @param {(event: NotificationEvent<T, D extends object>, error: any) => void} handler
     */
    setErrorHandler(handler: ErrorHandler<T, D>) {
        this._errorHandler = handler;
    }

    /**
     * [INTERNAL] Set a custom logger
     *
     * @internal
     * @param {LoggerInterface} logger
     */
    setLogger(logger: LoggerInterface) {
        this._logger = logger;
    }

    private warn(message: string) {
        if (this._logger) {
            this._logger.warn('[NotificationManager] ' + message);
        }
    }
}
