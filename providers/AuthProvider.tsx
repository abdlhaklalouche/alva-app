import { AuthContextProvider } from "@/context/authContext";
import CurrentUser from "@/types/CurrentUser";
import React, { ReactNode } from "react";

export default function AuthProvider({
  user,
  children,
}: {
  user: CurrentUser | null;
  children: ReactNode;
}) {
  return <AuthContextProvider user={user}>{children}</AuthContextProvider>;
}
