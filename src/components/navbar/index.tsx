import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";

import { useRouter } from "next/router";

export default function Nav() {
  //pesquisar como fazer com Next (converter a Dom)
  //const titleCurrent = document.title;

  const router = useRouter();

  return (
    <div className={styles.nav}>
      <div className={styles.botoesNav}>
        <Link
          style={{
            color: router.pathname == "/userEdit" ? "#e91c5d" : "#FFF",
          }}
          href="/userEdit"
        >
          Detalhes
        </Link>

        <Link
          style={{
            color: router.pathname == "/myImages" ? "#e91c5d" : "#FFF",
          }}
          href="/myImages"
        >
          Minhas imagens
        </Link>

        <Link
          style={{
            color: router.pathname == "/card" ? "#e91c5d" : "#FFF",
          }}
          href="/card"
        >
          Adicionar cartão
        </Link>

        <Link
          style={{
            color: router.pathname == "/passwordEdit" ? "#e91c5d" : "#FFF",
          }}
          href="/passwordEdit"
        >
          Alterar senha
        </Link>
      </div>
    </div>
  );
}
