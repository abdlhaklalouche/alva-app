import io, { Socket } from "socket.io-client";
import INotification from "~/types/INotification";
import { pushNotification } from "~/utils/notifications";
import * as Notifications from "expo-notifications";

class SocketSingleton {
  private static instance: Socket | null = null;

  static connect(token: string): Socket {
    if (!this.instance) {
      Notifications.cancelAllScheduledNotificationsAsync();

      this.instance = io(process.env.EXPO_PUBLIC_BACKEND_URL, {
        transports: ["websocket"],
        extraHeaders: {
          token: token,
        },
      });

      this.instance.on(
        "notification",
        async (notification: INotification) =>
          await pushNotification(notification)
      );
    }

    return this.instance;
  }

  static disconnect() {
    if (this.instance) {
      Notifications.cancelAllScheduledNotificationsAsync();

      this.instance.disconnect();
      this.instance = null;
    }
  }

  static getSocket(): Socket | null {
    return this.instance;
  }
}

export default SocketSingleton;
