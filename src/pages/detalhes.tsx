import styles from "../../styles/home.module.scss";
import Detalhes from "../components/detalhes/index";
import Header from "../components/header";

export default function Home() {
  return (
    <div className={styles.container}>   
      <Header/>
      <Detalhes/>
    </div>
  );
}