import styles from "./styles.module.scss";
import { setupApiClient } from "../../services/api";
import { useEffect, useState } from "react";
import { Product } from "../../models/product-type";
import { toast } from "react-toastify";
import Router from "next/router";

export default function Details(product: Product) {
  const [produto, setProduct] = useState(product);
  const api = setupApiClient();

  useEffect(() => {
    api
      .get(`/products/${product.id}`)
      .then((response) => setProduct(response.data));
  }, []);

  let price;
  produto.value != null
    ? (price = produto.value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      }))
    : 0;
  console.log(produto);

  async function addProductCart(idProduct: number) {
    if (idProduct > 0) {
      await api
        .put(`/cart/add-product/${idProduct}`)
        .then(() => {
          toast.success("Item adicionado ao carrinho");
          Router.push("/cart");
        })
        .catch(() => {
          toast.error("algo deu errado, tente novamente mais tarde");
          Router.push("/");
        });
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.principal}>
        <div className={styles.img}>
          <img src={produto.image.url} alt={produto.title} />

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
              <span>Dimensões: </span>{" "}
              <label>
                {produto.image.height} x {produto.image.widht}
              </label>
            </div>
          </div>
        </div>

        <div className={styles.infos}>
          <div className={styles.descricao}>
            <h3>Descrição</h3>

            <p>{produto.description}</p>
          </div>

          <div>
            <span className={styles.value}>{price}</span>
            <button onClick={() => addProductCart(produto.id)}>Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
