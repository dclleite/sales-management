import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

function Client() {
  const [state, setState] = useState({ name: "" });

  const teste = async () => {
    const profileInfo = await window.api.getProfileInfo({ name: "teste" });
    setState({ ...profileInfo });
  };
  return (
    <React.Fragment>
      <Head>
        <title>Clientes - Neoplast</title>
      </Head>
      <div style={{ backgroundColor: "#fff" }}>
        <h1>{state.name}</h1>
        <Button
          onClick={() => {
            teste();
          }}
        >
          Adicionar novo cliente
        </Button>
        <br />
        {/* <TextInput
          label="Nome:"
          value={state.name}
          onChange={(value) => setState({ ...state, name: value })}
        /> */}
      </div>
    </React.Fragment>
  );
}

export default Client;
