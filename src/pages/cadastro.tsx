import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/cadastro.module.scss";
import Header from "../components/header";
import { Input } from "../components/input";

export default function Cadastro() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      email,
      nome,
      sobrenome,
      password,
    };

    await signIn(credentials);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.login}>
        <form className={styles.form} action="" onSubmit={handleLogin}>
          <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Input
            placeholder="sobrenome"
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
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
