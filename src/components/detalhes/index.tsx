import styles from "./styles.module.scss";
import Header from "../header";
import imagem from "../../assets/imagem.png";
import Botao from "../button";

export default function Detalhes(){

    return(
        <div className={styles.container}>
      <Header />
      <div className={styles.panel}>
        <div className={styles.principal}>
            <div className={styles.img}>
              <h3>Nome Imagem</h3>

              <img src={imagem.src} alt="imagem"/>
            </div>
            <div className={styles.infos}>

              <div className={styles.propriedades}>

                <h3>Propriedades</h3>

                <div>
                  <span>Tipo: </span> <label>PNG</label>
                </div>
                <div>
                  <span>Tamanho: </span> <label>51.4KB</label>
                </div>
                <div>
                  <span>Dimensões: </span> <label>227 x 222</label>
                </div>

              </div>

              <div className={styles.descricao}>
                <h3>Descrição</h3>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley.
                </p>

                <div>
                  <label>R$500,00</label>
                  <button type="submit">Comprar</button>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.secundario}>

        </div>
      </div>
    </div>
    );
}