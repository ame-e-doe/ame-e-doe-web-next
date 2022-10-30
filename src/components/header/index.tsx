import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <h3>AME E DOE</h3>
      <div className={styles.botoesHeader}>
        <Link legacyBehavior href="/login">
          <a>ENTRAR</a>
        </Link>
        <Link legacyBehavior href="/cadastro">
          <a>CADASTRE-SE</a>
        </Link>
      </div>
    </div>
  );
}
