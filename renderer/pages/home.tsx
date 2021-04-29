import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/Button";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Dashboard - Neoplast</title>
      </Head>
      <div>
        <h1>Dashboard</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
