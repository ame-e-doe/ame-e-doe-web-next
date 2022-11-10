import styles from "../../styles/card.module.scss";
import { useState, FormEvent } from "react";
import { Input } from "../components/input";
import { CreateCardDto } from "../dto/create-card-dto";
import { setupApiClient } from "../services/api";
import Header from "../components/header";
import Head from "next/head";
import Nav from "../components/navbar";
import { toast } from "react-toastify";

export default function Card() {
  const [numCard, setNumCard] = useState("");
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
    await api
      .post("/card/create", {
        cardNumber,
        printedName,
        expirationDate,
        securityCode,
      })
      .then((response) => {
        toast.success("Cartão salvo com sucesso.");
        cleanFields();
        console.log(response);
      })
      .catch((err) => {
        toast.error(
          "Não foi possivel salvar o cartão, tente novamente mais tarde."
        );
        cleanFields();
        console.log(err);
      });

    console.log("Cartão salvo com sucesso");
  }

  function cleanFields() {
    setNumCard("");
    setCvv("");
    setValidate("");
    setName("");
  }

  return (
    <div className={styles.Container}>
      <Head>
        <title id="card">Cadastre seu Cartão!</title>
      </Head>
      <Header />
      <Nav />
      <div className={styles.card}>
        <div className={styles.headerCard}>
          <h1> Cadastro de Cartão </h1>
        </div>
        <form className={styles.form} action="" onSubmit={saveCard}>
          <Input
            placeholder="Número do cartão"
            type="text"
            value={numCard}
            maxLength={16}
            minLength={16}
            onChange={(e) => {
              const numberPattern = /\d+/g;
              const validacaoNumero = e.target.value.match(numberPattern) || [];
              const value = validacaoNumero.join("");
              setNumCard(value);
            }}
          />
          <div className={styles.cvv}>
            <Input
              placeholder="CVV"
              type="text"
              value={cvv}
              maxLength={3}
              minLength={3}
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
              type="month"
              value={validate}
              onChange={(e) => setValidate(e.target.value)}
            />
          </div>

          <Input
            placeholder="Nome"
            type="text"
            value={name}
            minLength={10}
            onChange={(e) => {
              const numberPartter =
                /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
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
