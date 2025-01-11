import * as Notifications from "expo-notifications";
import INotification from "~/types/INotification";

export const pushNotification = async (notification: INotification) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: notification.title,
      body: notification.description,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
};
