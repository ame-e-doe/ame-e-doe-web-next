import styles from "./styles.module.scss";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={styles.nav}>

      <div className={styles.botoesNav}>

        <Link legacyBehavior href="#">
          <a>Detalhes</a>
        </Link>

        <Link legacyBehavior href="#">
          <a>Minhas Imagens</a>
        </Link>

        <Link legacyBehavior href="/card">
          <a>Adicionar cartão</a>
        </Link>

        <Link legacyBehavior href="#">
          <a>Alterar senha</a>
        </Link>

      </div>

    </div>
  );
}