import styles from "../../styles/home.module.scss";
import { useState } from "react";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { Product } from "../models/product-type";

interface ProductList {
  listProduct: Product[];
}

export default function Home({ listProduct }: ProductList) {
  const [products, setProducts] = useState(listProduct || []);

  return (
    <div className={styles.container}>
      <h1>Aqui vou listar os produtos</h1>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/products/list");

  return {
    props: {
      listProduct: response.data,
    },
  };
});
