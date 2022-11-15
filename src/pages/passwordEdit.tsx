import Router from "next/router";
import { FormEvent, useState } from "react";
import Header from "../components/header";
import Nav from "../components/navbar";
import styles from "../../styles/passwordEdit.module.scss";
import { Input } from "../components/input";
import Head from "next/head";
import { setupApiClient } from "../services/api";
import { toast } from "react-toastify";
import { destroyCookie } from "nookies";
import { PasswordEditDto } from "../dto/password-edit-dto";

export default function PasswordEdit() {
  const [teste1, setOldPassword] = useState("");
  const [teste2, setNewPassword] = useState("");

  async function alterPassword(event: FormEvent) {
    event.preventDefault();
    const api = setupApiClient();

    const oldPassword = teste1;
    const newPassword = teste2;

    await api
      .post("user/reset/password", { oldPassword, newPassword })
      .then((response) => {
        toast.success("Senha alterada com sucesso!");
        destroyCookie(undefined, "@nextauth.token");
        destroyCookie(undefined, "@nextauth.id");
        Router.push("/login");
        console.log(response);
      })
      .catch((err) => {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        console.log(err);
      });
  }

  return (
    <div className={styles.Container}>
      <Head>
        <title>Altere sua Senha!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.passwordEdit}>
        <div className={styles.headerPasswordEdit}>
          <h1> Alterar senha </h1>
        </div>
        <form className={styles.form} action="" onSubmit={alterPassword}>
          <Input
            placeholder="Senha antiga"
            type="password"
            value={teste1}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <Input
            placeholder="Senha nova"
            type="password"
            value={teste2}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit"> Alterar senha </button>
        </form>
      </div>
    </div>
  );
}
