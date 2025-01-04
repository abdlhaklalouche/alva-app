import { AuthContextProvider } from "@/context/authContext";
import React, { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
