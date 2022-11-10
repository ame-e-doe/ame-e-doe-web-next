import styles from "../../styles/home.module.scss";
import { useState } from "react";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { Product } from "../models/product-type";
import Header from "../components/header";

interface ProductList {
  listProduct: Product[];
}

export default function Home({ listProduct }: ProductList) {
  const [products, setProducts] = useState(listProduct || []);

  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.logoLove}>
        <h1>AME E DOE</h1>
      </div>
      <div className={styles.boxCarousel}></div>
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
