import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import Header from "../components/header";
import Nav from "../components/navbar";
import styles from "../../styles/passwordEdit.module.scss";
import { Input } from "../components/input";
import Link from "next/link";
import Head from "next/head";

export default function PasswordEdit() {
  const { signIn } = useContext(AuthContext);

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  async function handleEditUser(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      newPassword,
      repeatPassword,
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Altere sua Senha!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.passwordEdit}>
        <div className={styles.headerPasswordEdit}>
          <h1> Alterar senha </h1>
        </div>
        <form className={styles.form} action="" onSubmit={handleEditUser}>
          <Input
            placeholder="Nova senha"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            placeholder="Insira novamente a senha"
            type="text"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <button type="submit"> Salvar </button>
        </form>
      </div>
    </div>
  );
}
