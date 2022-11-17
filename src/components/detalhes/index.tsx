import styles from "./styles.module.scss";
import { setupApiClient } from "../../services/api";
import { useEffect, useState } from "react";
import { Product } from "../../models/product-type";


export default function Details(product: Product) {
  const [produto, setResponse] = useState(product);

  
  const api = setupApiClient();

  useEffect(()=>{
    api.get(`/products/${product.id}`).then(response => setResponse(response.data))
  },[])
  
  let price

  (produto.value != null) ? price = produto.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : 0;
  

  console.log(produto)
  //response();

  return (
      <div className={styles.panel}>
        <div className={styles.principal}>
          <div className={styles.img}>
            <img src={produto.image.url} alt={produto.title}/>

            <div className={styles.propriedades}>

              <h3>{produto.title}</h3>

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

          </div>

          <div className={styles.infos}>

            <div className={styles.descricao}>
              <h3>Descrição</h3>

              <p>
                {produto.description}
              </p>
            </div>

            <div>
                <span className={styles.value}>{price}</span>
                <button type="submit">Comprar</button>
              </div>
          </div>
        </div>
        <div className={styles.secundario}>
        </div>
      </div>
  );
}

