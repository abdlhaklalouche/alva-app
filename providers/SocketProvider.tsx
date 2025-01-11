import React, { ReactNode } from "react";

// @ts-ignore
import SocketContextProvider from "@/context/socketContext";

export default function SocketProvider({
  token,
  children,
}: {
  token: string;
  children: ReactNode;
}) {
  return (
    <SocketContextProvider token={token}>{children}</SocketContextProvider>
  );
}
