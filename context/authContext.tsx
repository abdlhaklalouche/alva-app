"use client";

import { useUsersActions } from "@/api/users";
import CurrentUser from "@/types/CurrentUser";
import { getToken } from "@/utils/auth";
import React from "react";

export const AuthContext = React.createContext<{
  user: CurrentUser | null;
}>({
  user: null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<CurrentUser | null>(null);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
