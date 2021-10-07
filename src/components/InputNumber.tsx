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
  let numInt = useRef<{ val: number }>({ val: 0 });
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
          const lastDigit: string = num[num.length - 1];
          console.log(num, lastDigit);
          num = num.replace(/\D/g, "");
          numInt.current.val = Number.parseInt(num, 10);
          console.log(numInt.current.val);
          const formatted = new Intl.NumberFormat().format(numInt.current.val);
          if (!Number.isNaN(formatted)) onValueChange({ value: formatted });
        }}
      />
    </div>
  );
}

export default InputNumber;
