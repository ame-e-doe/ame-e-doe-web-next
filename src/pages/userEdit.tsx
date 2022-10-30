import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import Header from "../components/header";
import Nav from "../components/navibar";
import styles from "../../styles/userEdit.module.scss";
import { Input } from "../components/input";
import Link from "next/link";

export default function UserEdit() {
  const { signIn } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  async function handleEditUser(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      name,
      sobrenome,
    };
  }

  return (
    <div className={styles.container}>
      <Header />
      <Nav />
      <div className={styles.userEdit}>
        <h1>Editar dados da conta</h1>
        <form className={styles.form} action="" onSubmit={handleEditUser}>
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Sobrenome"
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />

          <button type="submit"> Salvar </button>
        </form>
      </div>
    </div>
  );
}
