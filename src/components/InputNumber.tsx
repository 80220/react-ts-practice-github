// https://www.primefaces.org/primereact/showcase/#/inputnumber
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";

interface Props {
  value: string;
  onValueChange: Function;
}

function InputNumber(props: Props) {
  const { value, onValueChange } = props;
  let numInt = useRef<number>();
  return (
    <div style={{ width: "min-content" }}>
      <label htmlFor="textInput"></label>
      <input
        id="textInput"
        value={value}
        type="text"
        onChange={(e) => {
          let num: string = e.target.value;
          if (num.length === 0) {
            onValueChange({ value: "" });
            return;
          }
          num = num.replace(/\D/g, "");
          numInt.current = Number.parseInt(num, 10);
          const formatted = new Intl.NumberFormat().format(numInt.current);
          if (!Number.isNaN(formatted)) onValueChange({ value: formatted });
        }}
      />
    </div>
  );
}

export default InputNumber;
