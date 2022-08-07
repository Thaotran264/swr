import React, { useState, createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initUser = { id: "", name: "", avatar: "", createdAt: "" };
  const [userState, setUserState] = useState(initUser);

  const value = {
    userState,
    setUserState,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
