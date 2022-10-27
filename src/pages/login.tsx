import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth-context";
import styles from "../../styles/home.module.scss";
import Header from "../components/header";
import { Input } from "../components/input";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    const credentials = {
      email,
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
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button type="submit">Entrar </button>
          <a href="#">Esqueceu a senha?</a>
        </form>
      </div>
    </div>
  );
}
