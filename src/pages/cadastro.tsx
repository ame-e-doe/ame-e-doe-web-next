import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/cadastro.module.scss";
import { Input } from "../components/input";
import Link from "next/link";
import Head from "next/head";
import { canSSRGuest } from "../utils/canSSRGuest";

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
    <div className={styles.Container}>
      <Head>
        <title>Realize seu Cadastro!</title>
      </Head>
      <div className={styles.cadastro}>
        <div className={styles.headerCadastro}>
          <h1>Cadastre-se</h1>
        </div>
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

          <button type="submit"> Cadastar </button>

          <Link href="/login">
            <label> Já realizou o Cadastro? </label> Login
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
