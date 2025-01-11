import { AuthContextProvider } from "@/context/authContext";
import CurrentUser from "@/types/CurrentUser";
import React, { ReactNode } from "react";

export default function AuthProvider({
  user,
  token,
  children,
}: {
  user: CurrentUser | null;
  token: string;
  children: ReactNode;
}) {
  return (
    <AuthContextProvider user={user} token={token}>
      {children}
    </AuthContextProvider>
  );
}
