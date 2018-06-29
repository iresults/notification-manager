import {NotificationEvent} from './NotificationEvent';

export interface NotificationManagerInterface<T, D extends object> {
    /**
     * Register a new listener `callback` for the given `eventType`
     *
     * @param {T} eventType
     * @param {(event: NotificationEvent<T, D>) => void} callback
     * @return {NotificationManagerInterface<T, D>}
     */
    register(
        eventType: T,
        callback: (event: NotificationEvent<T, D>) => void
    ): NotificationManagerInterface<T, D>;

    /**
     * Publish a notification for the given `eventType`
     *
     * @param {T} eventType
     * @param {D} data
     * @return {NotificationManagerInterface<T, D>}
     */
    notify(eventType: T, data?: D): NotificationManagerInterface<T, D>;

    /**
     * Publish a synchronous notification for the given `eventType`
     *
     * @param {T} eventType
     * @param {D} data
     * @return {NotificationManagerInterface<T, D>}
     */
    notifySync(eventType: T, data?: D): NotificationManagerInterface<T, D>;
}
