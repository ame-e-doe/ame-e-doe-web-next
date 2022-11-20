import styles from "../../styles/home.module.scss";
import { useState } from "react";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { Product } from "../models/product-type";
import Header from "../components/header";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import { Details } from "@mui/icons-material";

interface ProductList {
  listProduct: Product[];
}

export default function Home({ listProduct }: ProductList) {
  const [products, setProducts] = useState(listProduct || []);

  const router = useRouter();

  let listProducts: Product[] = [];

  if (products.length > 0) {
    products.forEach((s) => {
      listProducts.push(s);
    });
  }

  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.boxCarousel}>
        <div className={styles.myImages}>
          <div className={styles.logoLove}>
            <h1>AME E DOE</h1>
          </div>
          <div
            style={{
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageList
              style={{
                gap: "3rem",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              sx={{ width: "100%" }}
            >
              {listProducts.map((item) => {
                console.log(item);
                return (
                  <ImageListItem
                    style={{ height: "250px", maxWidth: "250px" }}
                    key={item.id}
                  >
                    <img 
                      style={{
                        width: "250px",
                        height: "100%",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                      src={item.image.url}
                      alt={item.title}
                    />
                    <ImageListItemBar
                      title={
                        <div
                          style={{ height: "30px", whiteSpace: "break-spaces" }}
                        >
                          <Link
                            style={{
                              color:
                                router.pathname == "/detalhes"
                                  ? "#e91c5d"
                                  : "#FFF",
                            }}
                            href={"/detalhes/" + item.id}
                          >
                            {item.title}
                          </Link>
                        </div>
                      }
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </div>
        </div>
      </div>
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
