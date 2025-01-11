"use client";

import React, { createContext, useEffect, useState } from "react";
import * as io from "socket.io-client";
import INotification from "~/types/INotification";
import { pushNotification } from "~/utils/notifications";

type SocketContextProps = { socket: io.Socket | undefined };

const SocketContext = createContext<SocketContextProps>({
  socket: undefined,
});

export default function SocketContextProvider({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<io.Socket>();

  useEffect(() => {
    let socket = io.connect(process.env.EXPO_PUBLIC_BACKEND_URL, {
      transports: ["websocket"],
      extraHeaders: {
        token: token,
      },
    });

    setSocket(socket);

    // Notifications section
    socket.on(
      "notification",
      async (notification: INotification) =>
        await pushNotification(notification)
    );

    return () => {
      socket.disconnect();
    };
  }, [socket?.connected]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => React.useContext(SocketContext);
