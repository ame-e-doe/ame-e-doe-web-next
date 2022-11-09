import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/login.module.scss";
import { Input } from "../components/input";
import { canSSRGuest } from "../utils/canSSRGuest";
import Link from "next/link";
import Head from "next/head";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };

    await signIn(credentials);
  }

  return (
    <div className={styles.Container}>
      <Head>
        <title>Realize o Login!</title>
      </Head>
      <div className={styles.login}>
        <div className={styles.headerLogin}>
          <h1>Entrar</h1>
        </div>
        <form className={styles.form} action="" onSubmit={handleLogin}>
          <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar </button>
          <Link href="/cadastro">
            <label> Ainda não tem conta? </label> Cadastre-se
          </Link>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
