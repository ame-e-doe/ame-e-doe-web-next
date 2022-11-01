import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import Header from "../components/header";
import Nav from "../components/navibar";
import styles from "../../styles/passwordEdit.module.scss";
import { Input } from "../components/input";
import Link from "next/link";

export default function PasswordEdit() {
  const { signIn } = useContext(AuthContext);

  const [newPassword, setNewPassword] = useState("");
  const [repitPassword, setRepitPassword] = useState("");

  async function handleEditUser(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      newPassword,
      repitPassword,
    };
  }

  return (
    <div className={styles.container}>
      <Header />
      <Nav />
      <div className={styles.passwordEdit}>
        <h1> Alterar senha</h1>
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
            value={repitPassword}
            onChange={(e) => setRepitPassword(e.target.value)}
          />

          <button type="submit"> Salvar </button>
        </form>
      </div>
    </div>
  );
}