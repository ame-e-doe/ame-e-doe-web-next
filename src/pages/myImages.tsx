import styles from "../../styles/myImages.module.scss";
import Header from "../components/header";
import Head from "next/head";
import Nav from "../components/navbar";

import { Product } from "../models/product-type";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useState } from "react";
import { Sales } from "../models/sales-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";

interface ListOrder {
  orderList: Sales[];
}

export default function myImages({ orderList }: ListOrder) {
  const [order, setOrder] = useState<Sales[]>(orderList || []);

  let listProducts: Product[] = [];

  if (order.length > 0) {
    order.forEach((s) => {
      s.products.forEach((p) => {
        listProducts.push(p);
      });
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Minhas Imagens!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.myImages}>
        <div className={styles.headerMyImages}>
          <h1> Minhas Imagens </h1>
        </div>
        <ImageList sx={{ width: 600, height: 500 }} cols={4} rowHeight={164}>
          {listProducts.map((item) => (
            <ImageListItem key={item.id}>
              <img src={item.image.url} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/sales/list");
  return {
    props: {
      orderList: response.data,
    },
  };
});
