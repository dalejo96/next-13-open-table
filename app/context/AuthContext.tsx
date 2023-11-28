"use client";

import { useState, createContext } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: (value: State) => void;
}

const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => undefined,
});

export default function AuthContext({ children }: AuthContextProps) {
  const defaultAuth = {
    loading: false,
    data: null,
    error: null,
  };

  const [authState, setAuthState] = useState<State>(defaultAuth);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthenticationContext.Provider>
  );
}
