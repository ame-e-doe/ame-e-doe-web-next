import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/cadastro.module.scss";
import Header from "../components/header";
import { Input } from "../components/input";
import Link from "next/link";
import Head from "next/head";

export default function Cadastro() {
  const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    await signUp(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Realize seu Cadastro!</title>
      </Head>
      <Header />
      <div className={styles.cadastro}>
        <h1>Cadastre-se</h1>
        <form className={styles.form} action="" onSubmit={handleRegister}>
          <Input
            placeholder="Nome"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            placeholder="Sobrenome"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />

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

          <Link legacyBehavior href="/login">
            <a>Já realizou o Cadastro? Login</a>
          </Link>
        </form>
      </div>
    </div>
  );
}
