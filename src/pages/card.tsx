import styles from "../../styles/card.module.scss";
import { useState, FormEvent } from "react";
import { Input } from "../components/input";
import { CreateCardDto } from "../dto/create-card-dto";
import { setupApiClient } from "../services/api";
import Header from "../components/header";

export default function Card() {
  const [numCard, setNumCart] = useState("");
  const [cvv, setCvv] = useState("");
  const [validate, setValidate] = useState("");
  const [name, setName] = useState("");

  async function saveCard(event: FormEvent) {
    event.preventDefault();

    //preicso validar antes de criar este objeto
    const card: CreateCardDto = {
      cardNumber: numCard,
      printedName: name,
      expirationDate: validate,
      securityCode: cvv,
    };

    const cardNumber = numCard;
    const printedName = name;
    const expirationDate = validate;
    const securityCode = cvv;

    const api = setupApiClient();
    await api.post("/card/create", {
      cardNumber,
      printedName,
      expirationDate,
      securityCode,
    });

    console.log("Cartão salvo com sucesso");
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.card}>
        <h1> Cadastro de Cartão </h1>
        <form className={styles.form} action="" onSubmit={saveCard}>
          <Input
            placeholder="Número do cartão"
            type="text"
            value={numCard}
            onChange={(e) => {
              const numberPattern = /\d+/g;
              const validacaoNumero = e.target.value.match(numberPattern) || [];
              const value = validacaoNumero.join("");
              setNumCart(value);
            }}
          />
          <div className={styles.cvv}>
            <Input
              placeholder="CVV"
              type="text"
              value={cvv}
              maxLength={3}
              onChange={(e) => {
                const numberPartter = /\d+/g;
                const validateNumber =
                  e.target.value.match(numberPartter) || [];
                const value = validateNumber.join("");
                setCvv(value);
              }}
            />

            <Input
              placeholder="Validade"
              type="text"
              value={validate}
              onChange={(e) => setValidate(e.target.value)}
            />
          </div>

          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => {
              const numberPartter = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
              const validateNumber = e.target.value.match(numberPartter) || [];
              const value = validateNumber.join("");
              setName(value);
            }}
          />
          <button type="submit">Salvar cartão</button>
        </form>
      </div>
    </div>
  );
}
