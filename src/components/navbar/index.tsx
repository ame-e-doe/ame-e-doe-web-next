import styles from "./styles.module.scss";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.botoesNav}>
        <Link href="/userEdit">Detalhes</Link>

        <Link href="/myImages">Minhas Imagens</Link>

        <Link href="/card">Adicionar cartão</Link>

        <Link href="/passwordEdit">Alterar senha</Link>
      </div>
    </div>
  );
}
