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
    <div>
      <div className={styles.Container}>
        <Header/>
      </div>
      <section>  
        <div>
          {cartItens?.length > 0 ? (
            cartItens.map((item) => (
              <section key={item.id}>
                <p>{item.price}</p>
                <p>{item.product.title}</p>
                <p>{item.product.description}</p>
                <p>{item.product.value}</p>
              </section>
            ))
          ) : (
            <p> Carrinho vazio </p>
          )}
        </div>

        <h1> Cartões </h1>
        <div>
          {cards?.length > 0 ? (
            cards.map((item) => (
              <section key={item.id}>
                <p>{item.cardNumber}</p>
                <p>{item.expirationDate}</p>
                <p>{item.printedName}</p>
                <p>{item.securityCode}</p>
              </section>
            ))
          ) : (
            <p> Nenhum cartão cadastrado </p>
          )}
        </div>
      </section>

      <button onClick={finishOrder}> Finalizar Venda </button>
      <button onClick={() => removeItem(17)}>Remove produto do carrinho</button>
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
