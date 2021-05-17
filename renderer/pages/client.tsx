import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

function Client() {

  async function teste() {
    const teste = await window.api.getPrecoProduto(1, 1)

    console.log(teste)
  }
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div>
        <h1>Clientes</h1>
        <br />
        <Button onClick={() => {teste()}} >Teste</Button>
      </div>
    </React.Fragment>
  );
}

export default Client;
