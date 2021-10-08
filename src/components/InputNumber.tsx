// https://www.primefaces.org/primereact/showcase/#/inputnumber
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";

interface Props {
  inputId: string;
  value: string;
  onValueChange: ({ value }: { value: string }) => void;
}

function InputNumber(props: Readonly<Props>) {
  const { value, onValueChange } = props;
  let numInt = useRef<number>();
  return (
    <div>
      <input
        id={props.inputId}
        type="text"
        value={value}
        onChange={(e) => {
          let num: string = e.target.value;
          num = num.replace(/\D/g, "");
          if (num.length === 0) {
            onValueChange({ value: "" });
            return;
          }
          numInt.current = Number.parseInt(num, 10);
          const formatted = new Intl.NumberFormat().format(numInt.current);
          if (!Number.isNaN(formatted)) onValueChange({ value: formatted });
        }}
      />
    </div>
  );
}

export default InputNumber;
