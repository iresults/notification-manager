export class NotificationEvent<T, D extends object> {
    readonly eventType: T;
    readonly data?: D;

    constructor(eventType: T, data?: D) {
        this.eventType = eventType;
        this.data = data;
    }
}
