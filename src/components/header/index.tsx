import styles from "./styles.module.scss";

export default function Header(){
    return(
        <div className={styles.header}>
            <h3>AME E DOE</h3>
                <div className={styles.botoesHeader}>
                <a href="/">ENTRAR</a>
                <a href="/cadastro">CADASTRE-SE</a>
            </div>
        </div>
    );
}