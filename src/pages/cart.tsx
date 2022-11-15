import { CartType } from "../models/cart-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { useState } from "react";
import { Product } from "../models/product-type";
import { CreateSaleDto } from "../dto/create-sale-dto";
import Router from "next/router";
import { toast } from "react-toastify";
import { CartItem } from "../models/cart-item-type";
import { Card } from "../models/card-type";
import styles from "../../styles/cart.module.scss";
import Header from "../components/header";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ComboBox from "../components/selectButton";

export interface ShoppingCart {
  cart: CartType;
  listCards: Card[] | null;
}

export default function Cart({ cart, listCards }: ShoppingCart) {
  const [itens, setItens] = useState<CartType>(cart);
  const [cards, setCards] = useState<Card[]>(listCards);
  const [cartItens, setCartItens] = useState<CartItem[]>(itens?.cartItems);

  let listProducts: Product[] = [];

  itens?.cartItems.forEach((i) => {
    listProducts.push(i.product);
  });

  const api = setupApiClient();

  async function finishOrder() {
    const sale: CreateSaleDto = {
      value: itens.total,
      products: listProducts.map((p) => {
        return p.id;
      }),
    };
    await api
      .post("/sales/create", sale)
      .then((response) => {
        toast.success("Compra finalizada com sucesso.");
        Router.push("/myImages");
        console.log(response);
      })
      .catch((error) => {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        Router.push("/");
        console.log(error);
      });
  }

  async function removeItem(itemId: number) {
    await api
      .delete(`/cart/${itemId}`)
      .then((response) => {
        toast.success("Item removido com sucesso");

        setCartItens(
          itens.cartItems.filter((i) => {
            return i.id !== itemId;
          })
        );
        console.log(response);
      })
      .catch((error) => {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        console.log(error);
      });
  }

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
            >
              ITENS
            </h3>
            <div
              style={{
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              
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
              <h3> {listProducts.length} </h3>
            </div>

            <div className={styles.total}>
              <h3> Total: </h3>
              <h3> R$: {cart.total} </h3>
            </div>

            <div className={styles.lineSale}></div>

            <div className={styles.totalPedido}>
              <h3> Total pedido </h3>
              <h3> R$: {cart.total} </h3>
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

            <ComboBox option={cards} />
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const shoppingCart = await apiClient.get("/cart");

  const cards = await apiClient
    .get("/card/list")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return {
    props: {
      cart: shoppingCart.data,
      listCards: cards || null,
    },
  };
});
