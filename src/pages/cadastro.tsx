import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/cadastro.module.scss";
import Header from "../components/header";
import { Input } from "../components/input";

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
      <Header />
      <div className={styles.login}>
        <form className={styles.form} action="" onSubmit={handleRegister}>
          <Input
            placeholder="nome"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            placeholder="sobrenome"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />

          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar </button>
          <a href="#">Já realizou o Cadastro? Login</a>
        </form>
      </div>
    </div>
  );
}