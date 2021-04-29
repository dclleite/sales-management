import React, { useRef } from "react";

import { CircleCheck } from "../Icons";

import styles from "./styles.module.scss";

export interface TextInputProps {
  name?: string;
  id?: string;
  value: string;
  label?: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function TextInput({
  value,
  name,
  id,
  label,
  onChange,
  required = false,
}: TextInputProps) {
  const refTeste = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.textInputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputContainer}>
        <input
          ref={refTeste}
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={(event) => {
            refTeste?.current.setCustomValidity("Teste");
            console.log(event.target.validationMessage);
            onChange(event.target.value);
          }}
          required={required}
          className={styles.input}
        />
        <div className={styles.icon}>
          <CircleCheck />
        </div>
      </div>

      <span className={styles.feedback}>Apenas números</span>
    </div>
  );
}
