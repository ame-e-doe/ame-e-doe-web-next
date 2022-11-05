import styles from "./styles.module.scss";
import Carrossel from "../carrossel/carrossel";
import { setupApiClient } from "../../services/api";
import { useEffect, useState } from "react";
import { Product } from "../../models/product-type";
import { canSSRAuth } from "../../utils/canSSRAuth";
import TesteCarrossel from "../testeCarrossel";
import { ImageListItem } from "@mui/material";


export default function Details(product: Product) {
  const [produto, setResponse] = useState(product);

  
  const api = setupApiClient();

  useEffect(()=>{
    api.get(`/products/${product.id}`).then(response => setResponse(response.data))
  },[])
  

  //response();

  return (
      <div className={styles.panel}>
        <div className={styles.principal}>
          <div className={styles.img}>
            <h3>{produto.title}</h3>

            <ImageListItem key={produto.id} className={styles.img}>
              <img src={produto.image.url} alt={produto.title} />
            </ImageListItem>
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
        </div>
      </div>
  );
}

