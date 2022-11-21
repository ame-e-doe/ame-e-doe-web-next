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

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export interface ShoppingCart {
  cart: CartType;
  listCards: Card[] | null;
}

export default function Cart({ cart, listCards }: ShoppingCart) {
  const [itens, setItens] = useState<CartType>(cart);
  const [cards, setCards] = useState<Card[]>(listCards);
  const [cartItens, setCartItens] = useState<CartItem[]>(itens?.cartItems);
  const [cardSelected, setCardSelected] = useState("");

  let listProducts: Product[] = [];

  itens?.cartItems.forEach((i) => {
    listProducts.push(i.product);
  });

  let optionsCardName: string[] = [];
  if (cards?.length > 0) {
    cards.forEach((c) => {
      let num = c.cardNumber.substring(12, 16);
      optionsCardName.push(`Cartão terminado em ****${num}`);
    });
  }

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
        setCartItens((prevState) => {
          return prevState.filter((i) => i.id !== itemId);
        });
      })
      .catch((error) => {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        console.log(error);
      });
  }

  console.log(cartItens);
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

            <ImageList
              style={{ gap: "3rem", display: "flex", flexWrap: "wrap" }}
              sx={{ width: "80%", marginLeft: "20px" }}
            >
              {cartItens.map((item) => {
                console.log(item);
                return (
                  <ImageListItem
                    style={{
                      height: "250px",
                      maxWidth: "500px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    key={item.id}
                  >
                    <img
                      style={{
                        width: "250px",
                        height: "100%",
                        borderRadius: "15px",
                      }}
                      src={item.product.image.url}
                      alt={item.product.title}
                    />
                    <div className={styles.infosCart}>
                      <label style={{ paddingBottom: "5px" }}>
                        {item.product.title}
                      </label>
                      <label style={{ paddingBottom: "5px" }}>
                        {item.product.category.description}
                      </label>
                      <label style={{ paddingBottom: "5px" }}>
                        R$ {item.product.value}
                      </label>

                      <label
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      >
                        <DeleteForeverIcon
                          style={{
                            color: "#E91C5D",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        />
                      </label>
                    </div>
                  </ImageListItem>
                );
              })}
            </ImageList>

            <div
              style={{
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
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

            <Autocomplete
              disableCloseOnSelect
              id="combo-box-demo"
              disabled={cards?.length === 0 || !cards}
              options={optionsCardName}
              sx={{ width: "80%", marginTop: "20px", marginLeft: "10%" }}
              onChange={(event: any, newValue: string | null) => {
                setCardSelected(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    !cards ? "Nenhum cartão cadastrado" : "Cartões cadastrados"
                  }
                />
              )}
            />
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
              disabled={listProducts.length === 0 || cardSelected === ""}
              className={styles.buttonFinal}
              type="submit"
              onClick={finishOrder}
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
