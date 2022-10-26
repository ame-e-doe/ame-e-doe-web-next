import { setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { CreateUserDto } from "../dto/create-user-dto";
import { SiginDto } from "../dto/singnin-dto";
import { api } from "../services/api-client";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SiginDto) => Promise<void>;
  signUp: (credentials: CreateUserDto) => Promise<void>;
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
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !(user == null);

  async function signIn({ email, password }: SiginDto) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken } = response.data;
      setCookie(undefined, "@nextauth.token", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // expiração do token
      });

      // passar para as proximas requisições o token
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } catch (err) {
      console.log("Error ao acessar", err);
    }
  }

  async function signUp(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password } = createUserDto;

      const response = await api.post("/user/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Cadastrado com sucesso");
    } catch (err) {
      alert(err.response.data.errors[0].message);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
