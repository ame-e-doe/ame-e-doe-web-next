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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function alterPassword(event: FormEvent) {
    event.preventDefault();
    const api = setupApiClient();

    const edit: PasswordEditDto = {
      oldPassword,
      newPassword,
    };

    await api
      .put("user/reset/password", edit)
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
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <Input
            placeholder="Senha nova"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit"> Alterar senha </button>
        </form>
      </div>
    </div>
  );
}
