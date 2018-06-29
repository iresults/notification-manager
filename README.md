# Notification Manager

## Usage

```typescript
// 1. Import classes
import {NotificationManager, NotificationEvent, NotificationManagerInterface} from './index';

// The expected type of data sent to and from the NotificationManager can be defined  
type DataType = { payload: string };

// 2. Create a Notification Manager instance
const notificationManager = new NotificationManager<string, DataType>();

// 3. Register a Listener
const eventType = 'receivedPayload';
notificationManager.register(
    eventType, 
    (event: NotificationEvent<string, DataType>) => {
        // Handle the event
    }
);

// 4. Dispatch a Notification
const eventData: DataType = {payload: 'Hello listener!'};
notificationManager.notify(eventType, eventData);
```
