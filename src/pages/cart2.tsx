import styles from "../../styles/cart.module.scss";
import Header from "../components/header";

import { Product } from "../models/product-type";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import ComboBox from "../components/comboBox";

export default function Cart2() {
  let listProducts: Product[] = [];

  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.cartContainer}>
        <div className={styles.headerCart}>
          <h1> Carrinho </h1>
        </div>
        <div className={styles.divisao}>
          <div className={styles.cartLeft}>
            <h3
              style={{
                color: "#e91c5d",
                paddingBottom: "1rem",
                marginLeft: "10%",
                marginTop: "5%",
              }}
            > ITENS
            </h3>
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
                        }}
                        src={item.image.url}
                        alt={item.title}
                      />
                      <ImageListItemBar
                        title={
                          <div
                            style={{
                              height: "30px",
                              whiteSpace: "break-spaces",
                            }}
                          >
                            {item.title}
                          </div>
                        }
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.title}`}
                          >
                            <SimCardDownloadIcon style={{ color: "#E91C5D" }} />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </div>
          </div>
          <div className={styles.cartRight}>
            <h2
              style={{
                marginLeft: "10%",
                color: "#000",
                marginTop: "20px",
                marginBottom: "25px",
                alignItems: "center",
              }}
            >

              Resumo do Pedido
            </h2>

            <div className={styles.itens}>
              <h3> Itens: </h3>
              <h3> 2 </h3>
            </div>

            <div className={styles.total}>
              <h3> Total: </h3>
              <h3> R$: </h3>
            </div>

            <div className={styles.lineSale}></div>

            <div className={styles.totalPedido}>
              <h3> Total pedido </h3>
              <h3> R$: </h3>
            </div>

            <h2
              style={{
                marginLeft: "10%",
                color: "#000",
                marginTop: "80px",
                alignItems: "center",
              }}
            >
              Selecione o Cartão
            </h2>

            <ComboBox />
            <button
              style={{
                marginTop: "10%",
                marginLeft: "20%",
                height: "50px",
                width: "60%",
                fontSize: "1.2rem",
                borderRadius: "8px",
                background: "var(--pink-900)",
                color: "var(--white)",
                fontWeight: "bold",
              }}
              className={styles.buttonFinal}
              type="submit"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
