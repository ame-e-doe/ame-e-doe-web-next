import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.header}>
      <h3>AME E DOE</h3>
      <div className={styles.botoesHeader}>
        <Link href="/login">ENTRAR</Link>
        <Link href="/cadastro">CADASTRE-SE</Link>
      </div>
    </div>
  );
}
