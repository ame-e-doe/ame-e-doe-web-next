import styles from "../../styles/home.module.scss";
import { useState, FormEvent } from "react";
import { Input } from "../components/input";
import { CreateCardDto } from "../dto/create-card-dto";
import { setupApiClient } from "../services/api";

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
      <div className={styles.login}>
        <form className={styles.form} action="" onSubmit={saveCard}>
          <Input
            placeholder="Número do cartão"
            type="text"
            value={numCard}
            onChange={(e) => setNumCart(e.target.value)}
          />

          <span>
            <Input
              placeholder="CVV"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <Input
              placeholder="Validade"
              type="text"
              value={validate}
              onChange={(e) => setValidate(e.target.value)}
            />
          </span>
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">Salvar cartão</button>
        </form>
      </div>
    </div>
  );
}
