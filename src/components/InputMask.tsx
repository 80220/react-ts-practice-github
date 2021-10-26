// https://www.primefaces.org/primereact/showcase/#/inputmask
import { KeyboardEvent, useEffect } from "react";

interface Props {
  id: string;
  value: string | undefined;
  mask: string | undefined;
  placeholder: string | undefined;
  slotChar: string | undefined;
  onChange: ({ value }: { value: string | undefined }) => void;
}
const defaultProps = {
  slotChar: undefined
};
const validateKey = (key: string) => {
  /* Allowed input:
  a - Alpha character (A-Z,a-z)
  9 - Numeric character (0-9)
  * - Alpha numberic character (A-Z,a-z,0-9)
  backspace/delete/arrow left right/
 */
  const regex = new RegExp(
    /(^[a-z]$)|(^[A-Z]$)|(^[0-9]$)|(^Backspace$)|(^Delete$)|(^ArrowLeft$)|(^ArrowRight$)/g
  );
  return regex.test(key);
};

export default function InputMask(props: Readonly<Props>) {
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const key: string = e.key;
    if (!validateKey(key)) return e.preventDefault();
  };

  useEffect(() => {
    console.log("rendered");
  }, [props.value]);

  return (
    <input
      placeholder={props.placeholder}
      onKeyDown={keyDownHandler}
      value={props.value}
      onChange={(e) => {
        props.onChange(e);
        e.preventDefault();
      }}
    />
  );
}

InputMask.defaultProps = defaultProps;
