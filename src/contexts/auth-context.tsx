import { createContext, ReactNode, useState } from "react";
import { SiginDto } from "../dto/singnin-dto";
import { api } from "../services/api-client";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SiginDto) => Promise<void>;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, setUser } = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn(credentials: SiginDto) {
    const email = credentials.email;
    const password = credentials.password;
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log("Error ao acessar", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
