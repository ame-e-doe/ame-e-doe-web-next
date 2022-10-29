import { useState } from "react";
import { Sales } from "../models/sales-type";
import { setupApiClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";

interface ListOrder {
  orderList: Sales[];
}

export default function Orders({ orderList }: ListOrder) {
  const [order, setOrder] = useState(orderList || []);

  return (
    <div>
      <h1>Aqui vou listar os pedidos do usuario</h1>
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
