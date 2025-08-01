"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useMemo,
} from "react";

export type HeaderContextProps = {
  headerHeight: number;
  setHeaderHeight: (value: number) => void;
};

export type HeaderContextProviderProps = {
  children: ReactNode;
};

export const HeaderContext = createContext<HeaderContextProps | null>(null);

export const HeaderContextProvider = (props: HeaderContextProviderProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const value = useMemo(
    () => ({
      headerHeight,
      setHeaderHeight,
    }),
    [headerHeight, setHeaderHeight],
  );

  return (
    <HeaderContext.Provider value={value}>
      {props.children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "useHeaderContext must be used within a HeaderContextProvider",
    );
  }

  return context;
};
