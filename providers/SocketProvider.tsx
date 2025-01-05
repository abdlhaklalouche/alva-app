import React, { ReactNode } from "react";

// @ts-ignore
import SocketContextProvider from "@/context/socketContext";

export default function SocketProvider({ children }: { children: ReactNode }) {
  return <SocketContextProvider>{children}</SocketContextProvider>;
}
