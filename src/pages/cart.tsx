import { CartType } from "../models/cart-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { useState } from "react";

export default function Cart(c: CartType) {
  const [cart, setCart] = useState(c || []);

  const api = setupApiClient();

  //remove item do carrinho
  async function removeItem(idItem: number) {
    await api.delete("/cart/", {
      data: {
        idItem,
      },
    });
  }

  return (
    <div>
      <h1>Aqui vou exibir o carrinho</h1>
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
