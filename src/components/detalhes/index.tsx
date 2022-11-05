import styles from "./styles.module.scss";
import Carrossel from "../carrossel/carrossel";
import { setupApiClient } from "../../services/api";
import { useState } from "react";
import { Product } from "../../models/product-type";
import { canSSRAuth } from "../../utils/canSSRAuth";


export default function Details(product: Product) {
  const [produto, setResponse] = useState(product);

  
  const api = setupApiClient();

  const res = async () => { await api.get<Product>(`/products/${product.id}`) };

  //setResponse(res)

  // const response = async () => {
  //   try {
  //     const res = await api.get<Product>(`/products/${product.id}`);
  //     setResponse(res.data);
  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // };

  // //response();

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.principal}>
          <div className={styles.img}>
            <h3>{produto.title}</h3>

            <img src={produto.image.url} alt="imagem" />
          </div>
          <div className={styles.infos}>
            <div className={styles.propriedades}>
              <h3>Propriedades</h3>

              <div>
                <span>Tipo: </span> <label>{produto.image.format}</label>
              </div>
              <div>
                <span>Tamanho: </span> <label>51.4KB</label>
              </div>
              <div>
                <span>Dimensões: </span> <label>{produto.image.height} x {produto.image.widht}</label>
              </div>
            </div>

            <div className={styles.descricao}>
              <h3>Descrição</h3>

              <p>
                {produto.description}
              </p>

              <div>
                <label>{produto.value}</label>
                <button type="submit">Comprar</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secundario}>
          <Carrossel />
        </div>
      </div>
    </div>
  );
}
