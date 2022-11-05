import styles from "./styles.module.scss";

export default function Botao(props){
    return(
        <button style={props.styles}>{ props.title }</button>
    );
}

//Arrumar essa bosta
