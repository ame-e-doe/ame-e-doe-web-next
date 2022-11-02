import styles from "../../styles/myImages.module.scss";
import Header from "../components/header";
import Head from "next/head";
import Nav from "../components/navbar";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";
import { Sales } from "../models/sales-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";

interface ListOrder {
  orderList: Sales[];
}

export default function myImages({ orderList }: ListOrder) {
  const [order, setOrder] = useState(orderList || []);

  const listProducts = [];

  if (order.length > 0) {
    order.forEach((p) => {
      listProducts.push(p.products);
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
      </div>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/sales/list");
  console.log(response);
  return {
    props: {
      orderList: response.data,
    },
  };
});
