import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

//função para paginas que só podem ser acessadas por visitante
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    //Caso o usuario esteja logado, redirecionar ele para a tela HOME
    if (cookies["@nextauth.token"]) {
      return {
        redirect: {
          //retornando ele para home, ainda não existe
          destination: "/",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}
