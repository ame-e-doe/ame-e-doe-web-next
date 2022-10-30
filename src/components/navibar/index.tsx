import styles from "./styles.module.scss";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.botoesNav}>
        <Link href="#">Detalhes</Link>

        <Link href="#">Minhas Imagens</Link>

        <Link href="/card">Adicionar cartão</Link>

        <Link href="#">Alterar senha</Link>
      </div>
    </div>
  );
}
