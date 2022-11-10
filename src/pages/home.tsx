import { useContext } from "react";
import Detalhes from "../components/detalhes/index";
import styles from "../../styles/detalhes.module.scss";
import Header from "../components/header";
import { AuthContext } from "../contexts/auth-context";
import { Product } from "../models/product-type";

export default function Home() {
  const { signIn } = useContext(AuthContext);
  
  const product: Product = {
    id: 1,
    description: '',
    title: '',
    value: 0,
    category: {
      id: 0,
      description: "",
    },
    image: {
      id: 0,
      format: "",
      height: "",
      widht: "",
      imageId: "",
      name: "",
      url: "",
    }
  }

  return (
    <div className={styles.container}>

      <Header />
      <div className={styles.detalhes}>
        <Detalhes {...product}/>
      </div>
    </div>
  );
}
