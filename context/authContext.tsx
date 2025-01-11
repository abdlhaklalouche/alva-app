"use client";

import CurrentUser from "@/types/CurrentUser";
import React from "react";

export const AuthContext = React.createContext<{
  user: CurrentUser | null;
  token: string;
}>({
  user: null,
  token: "",
});

export const AuthContextProvider = ({
  user,
  token,
  children,
}: {
  user: CurrentUser | null;
  token: string;
  children: React.ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ user: user, token: token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
