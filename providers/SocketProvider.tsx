import React, { ReactNode } from "react";
import SocketContextProvider from "@/context/socketContext";

export default function SocketProvider({ children }: { children: ReactNode }) {
  return <SocketContextProvider>{children}</SocketContextProvider>;
}
