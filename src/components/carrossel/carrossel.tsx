import 'bootstrap/dist/css/bootstrap.css';
import Carousel  from 'react-bootstrap/Carousel';
import imagem1 from "../../assets/imagem1.png";
import imagem2 from "../../assets/imagem2.png";
import imagem3 from "../../assets/imagem3.png";
import imagem4 from "../../assets/imagem4.png";
import styles from "./styles.module.scss";
  
export default function Carrossel() {
  return (
    <div className={styles.container}>
      <Carousel>
        <Carousel.Item>
          <img 
            className={styles.item}
            src={imagem1.src} alt="imagem"/>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className={styles.item}
            src={imagem2.src} alt="imagem"/>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className={styles.item}
            src={imagem3.src} alt="imagem"/>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className={styles.item}
            src={imagem4.src} alt="imagem"/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}