import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CreateUserDto } from "../dto/create-user-dto";
import { SiginDto } from "../dto/singnin-dto";
import { ErrorApi } from "../models/error-api";
import { api } from "../services/api-client";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SiginDto) => Promise<void>;
  signUp: (credentials: CreateUserDto) => Promise<void>;
  signOut: () => void;
}

interface UserProps {
  id: number;
  firstName: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    destroyCookie(undefined, "@nextauth.id");
    Router.push("/login");
  } catch (err) {
    console.log("erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>(undefined);
  const isAuthenticated = !(user == null);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/user/me")
        .then((response) => {
          const { id, firstName, username } = response.data;
          setUser({
            id,
            firstName,
            email: username,
          });
        })
        .catch(() => {
          setUser(undefined);
          signOut();
        });
    }
  }, []);

  async function signIn({ email: login, password }: SiginDto) {
    try {
      const response = await api.post("/auth/login", {
        email: login,
        password,
      });

      const { id, accessToken, firstName, email } = response.data;
      setCookie(undefined, "@nextauth.token", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // expiração do token
      });
      setCookie(undefined, "@nextauth.id", id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      setUser({ id, firstName, email });

      // passar para as proximas requisições o token
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      api.defaults.headers.common["idUser"] = id;

      toast.success("Login efetuado com sucesso!");

      Router.push("/");
    } catch (err) {
      if (err.response.data.message !== undefined) {
        toast.error(err.response.data.message);
      } else {
        const er: ErrorApi[] = err.response.data.errors;
        er.forEach((e) => {
          toast.error(e.addInformation + " " + e.message);
        });
      }
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

      toast.success("Conta criada com sucesso");
      Router.push("/login");
    } catch (err) {
      if (err.response.data.message !== undefined) {
        toast.error(err.response.data.message);
      } else {
        const er: ErrorApi[] = err.response.data.errors;
        er.forEach((e) => {
          toast.error(e.addInformation + " " + e.message);
        });
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
