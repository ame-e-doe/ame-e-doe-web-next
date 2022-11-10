import { CartType } from "../models/cart-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { useState } from "react";
import { Product } from "../models/product-type";
import { CreateSaleDto } from "../dto/create-sale-dto";
import Router from "next/router";
import { toast } from "react-toastify";
import { CartItem } from "../models/cart-item-type";

export interface ShoppingCart {
  cart: CartType;
}

export default function Cart({ cart }: ShoppingCart) {
  const [itens, setItens] = useState<CartType>(cart);
  const [cartItens, setCartItens] = useState<CartItem[]>(itens.cartItems);

  let listProducts: Product[] = [];

  itens.cartItems.forEach((i) => {
    listProducts.push(i.product);
  });

  const api = setupApiClient();

  //finaliza o pedido
  async function finishOrder() {
    const sale: CreateSaleDto = {
      value: itens.total,
      products: listProducts.map((p) => {
        return p.id;
      }),
    };
    await api
      .post("/sales/create", sale)
      .then(function (response) {
        toast.success("Compra finalizada com sucesso.");
        Router.push("/myImages");
        console.log(response);
      })
      .catch(function (error) {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        Router.push("/");
        console.log(error);
      });
  }

  //remove item do carrinho
  async function removeItem(itemId: number) {
    await api
      .delete(`/cart/${itemId}`)
      .then(function (response) {
        toast.success("Item removido com sucesso");

        setCartItens(
          itens.cartItems.filter((i) => {
            return i.id !== itemId;
          })
        );

        console.log(response);
      })
      .catch(function (error) {
        toast.error("Algo deu errado, tente novamente mais tarde.");
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Aqui vou exibir o carrinho</h1>

      <div style={{ color: "#fff" }}>
        {cartItens.map((item) => (
          <section key={item.id}>
            <p>{item.price}</p>
            <p>{item.product.title}</p>
            <p>{item.product.description}</p>
            <p>{item.product.value}</p>
          </section>
        ))}
      </div>

      <button onClick={finishOrder}> Finalizar Venda </button>
      <button onClick={() => removeItem(18)}>Remove produto do carrinho</button>
    </div>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/cart");

  return {
    props: {
      cart: response.data,
    },
  };
});
