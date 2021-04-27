import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      <Image
        width={160}
        height={107}
        src="/images/neoplast-logo.svg"
        objectFit="contain"
      />

      <div className={styles.buttons}>
        <Link href="/home">
          <button>Dashboard</button>
        </Link>
        <Link href="/client">
          <button>Clientes</button>
        </Link>
      </div>
    </div>
  );
}
