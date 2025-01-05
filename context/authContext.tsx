"use client";

import CurrentUser from "@/types/CurrentUser";
import React from "react";

export const AuthContext = React.createContext<{
  user: CurrentUser | null;
}>({
  user: null,
});

export const AuthContextProvider = ({
  user,
  children,
}: {
  user: CurrentUser | null;
  children: React.ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
