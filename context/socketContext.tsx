import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import SocketSingleton from "~/singletons/socket";

const SocketContext = createContext<{ socket: Socket | null }>({
  socket: null,
});

export const SocketContextProvider: React.FC<{
  token: string;
  children: React.ReactNode;
}> = ({ token, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = SocketSingleton.connect(token);
    setSocket(newSocket);

    return () => {
      SocketSingleton.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketContextProvider;
