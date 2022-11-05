import styles from "../../styles/myImages.module.scss";
import Header from "../components/header";
import Head from "next/head";
import Nav from "../components/navbar";

import { Product } from "../models/product-type";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

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
    <div className={styles.Container}>
      <Head>
        <title>Minhas Imagens!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.myImages}>
        <div className={styles.headerMyImages}>
          <h1> Minhas Imagens </h1>
        </div>
        <div style={{padding:'2rem', display: 'flex', alignItems: 'center', justifyContent:'center'}} >
            <ImageList style={{ gap: '3rem', display:'flex', flexWrap: 'wrap', justifyContent: 'center'}} sx={{ width: '100%'}}>
              {listProducts.map((item) => {
                console.log(item)
                return (   
                <ImageListItem style={{height:'250px', maxWidth:'250px'}} key={item.id}>
                  <img style={{width:'250px', height: '100%', borderRadius: '15px'}} src={item.image.url} alt={item.title} />
                  <ImageListItemBar
                    title={
                      <div style={{ height: "30px", whiteSpace: "break-spaces" }}>  
                        {item.title}
                      </div>
                    }
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <SimCardDownloadIcon style={{color: '#E91C5D'}}/>
                      </IconButton>
                    } 
                  />
                </ImageListItem>
             )})}
            </ImageList>
        </div>
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
