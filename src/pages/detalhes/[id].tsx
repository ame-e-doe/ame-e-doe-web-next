import styles from "../../../styles/detalhes.module.scss"
import Details from "../../components/detalhes";
import { useRouter } from 'next/router'
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupApiClient } from "../../services/api";
import { Product } from "../../models/product-type";
import Header from "../../components/header";

export default function Detalhes() {

  const { query } = useRouter()

  let produto: Product = {
    id: Number(query.id),
    description: '',
    title: '',
    value: 0,
    category: null,
    image: {
      id: 1,
      format: '',
      height: '',
      widht: '',
      imageId: '',
      name: '',
      url: '',
    },
  }
  console.log(produto);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.detalhes}>
        <Details {...produto}></Details>
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
