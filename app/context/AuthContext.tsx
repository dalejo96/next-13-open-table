"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, createContext, useContext, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

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
    loading: true,
    data: null,
    error: null,
  };

  const [authState, setAuthState] = useState<State>(defaultAuth);

  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        return setAuthState({ data: null, error: null, loading: false });
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>{children}</AuthenticationContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthenticationContext);
