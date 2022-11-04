import styles from "./styles.module.scss";
import Link from "next/link";

export default function Nav() {
  //pesquisar como fazer com Next (converter a Dom)
  //const titleCurrent = document.title;
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
