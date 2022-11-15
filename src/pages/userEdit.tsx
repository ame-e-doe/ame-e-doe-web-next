import { FormEvent, useContext, useState } from "react";
import Header from "../components/header";
import Nav from "../components/navbar";
import styles from "../../styles/userEdit.module.scss";
import { Input } from "../components/input";
import Head from "next/head";
import { setupApiClient } from "../services/api";
import { UserEditDto } from "../dto/user-edit-dto";
import { toast } from "react-toastify";
import Router from "next/router";
import { destroyCookie } from "nookies";

export default function UserEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleEditUser(event: FormEvent) {
    event.preventDefault();

    const api = setupApiClient();

    const edit: UserEditDto = {
      firstName,
      lastName,
    };

    await api
      .put("user/update", edit)
      .then((response) => {
        toast.success("Dados alterados com sucesso");
        cleanFiles();
        destroyCookie(undefined, "@nextauth.token");
        destroyCookie(undefined, "@nextauth.id");
        Router.push("/login");
        console.log(response);
      })
      .catch((err) => {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        cleanFiles();
        console.log(err);
      });
  }

  function cleanFiles() {
    setFirstName("");
    setLastName("");
  }

  return (
    <div className={styles.Container}>
      <Head>
        <title>Edite sua conta!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.userEdit}>
        <div className={styles.headerUserEdit}>
          <h1>Editar dados da conta</h1>
        </div>
        <form className={styles.form} action="" onSubmit={handleEditUser}>
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
            onChange={(e) => setLastName(e.target.value)}
          />

          <button type="submit"> Salvar </button>
        </form>
      </div>
    </div>
  );
}
