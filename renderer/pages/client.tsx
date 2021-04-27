import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";

function Client() {
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div style={{ backgroundColor: "#fff" }}>
        <h1>Clientes</h1>
        <Button>Adicionar novo cliente</Button>
      </div>
    </React.Fragment>
  );
}

export default Client;
