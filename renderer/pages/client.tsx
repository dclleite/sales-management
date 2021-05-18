import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

function Client() {

  async function teste() {
    window.api.clientQueries.updateClient({
      id: 'uuid()1',
      name: 'xxxxxx',
      cpfCnpj: 'xxxxxx',
      phone: 'xxxxxx',
      email: 'xxxxxx',
      street: 'xxxxxx',
      streetNumber: 'xxxxxx',
      neighborhood: 'xxxxxx',
      cep: 'xxxxxx',
      city: 'xxxxxx',
      state: 'xxxxxx',
    }).then((rest) => {
      console.log('id', rest);
      window.api.clientQueries.getClients().then(console.log)
    })
  }
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div>
        <h1>Clientes</h1>
        <br />
        <Button onClick={teste} >Teste</Button>
      </div>
    </React.Fragment>
  );
}

export default Client;
