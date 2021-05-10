import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

function Client() {
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div>
        <h1>Clientes</h1>
      </div>
    </React.Fragment>
  );
}

export default Client;
