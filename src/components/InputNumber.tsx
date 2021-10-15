// https://www.primefaces.org/primereact/showcase/#/inputnumber
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  inputId: string;
  value: string;
  onValueChange: ({ value }: { value: string }) => void;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}
const defaultProps = {
  useGrouping: true,
  minFractionDigits: null,
  maxFractionDigits: null
};

const style = css``;

function InputNumber(props: Readonly<Props>) {
  const { value, onValueChange } = props;
  let numInt = useRef<number>();
  const inputRef = useRef<HTMLInputElement | null>(null); // to control caret position
  const [caretPosStart, setCaretPosStart] = useState<number | null>(0);
  const [caretPosEnd, setCaretPosEnd] = useState<number | null>(0);

  const locale = navigator.language;
  const options = {
    useGrouping: props.useGrouping,
    minimumFractionDigits: props.minFractionDigits,
    maximumFractionDigits: props.maxFractionDigits
  };
  const formatter = new Intl.NumberFormat(locale, options);

  const getSeparators = () => {
    const n = 1234.56;
    const parts = formatter.formatToParts(n);
    const groupSeparator = parts.find(
      (o: { type: string; value: string }) => o.type === "group"
    )?.value;
    const decimalSeparator = parts.find(
      (o: { type: string; value: string }) => o.type === "decimal"
    )?.value;
    return { groupSeparator, decimalSeparator };
  };

  const sanitizeUserInput = (s: string) => {
    const { groupSeparator } = getSeparators();
    if (!groupSeparator) return s;
    const regex = new RegExp(groupSeparator, "g");
    return s.replace(regex, "");
  };

  const removeByIndex = (str: string, start: number, end: number) => {
    return str.slice(0, start) + str.slice(end);
  };

  const renderNumber = (num: string) => {
    num = sanitizeUserInput(num);
    if (num.length === 0) return onValueChange({ value: "" });

    numInt.current = Number.parseFloat(num);
    const formatted = formatter.format(numInt.current);
    const positionDiff = formatted.length - value.length;
    console.log(
      "num",
      num,
      "formatted",
      formatted,
      "positionDiff",
      positionDiff
    );
    if (caretPosStart !== null && positionDiff > 0) {
      setCaretPosStart(caretPosStart + positionDiff);
      setCaretPosEnd(caretPosStart + positionDiff);
    }
    onValueChange({ value: formatted });
  };

  const backspace = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.selectionStart === null) return; // https://html.spec.whatwg.org/multipage/input.html#do-not-apply

    let caretPosStart = target.selectionStart;
    let caretPosEnd = target.selectionEnd || target.selectionStart;

    console.log("selection", caretPosStart, caretPosEnd);

    const currentValue = target.value;

    if (target.selectionStart === 0) return;
    const { groupSeparator, decimalSeparator } = getSeparators();
    if (
      [groupSeparator, decimalSeparator].indexOf(
        currentValue[caretPosStart - 1]
      ) !== -1
    ) {
      setCaretPosStart(caretPosStart - 1);
      setCaretPosEnd(caretPosStart - 1);
      e.preventDefault(); // do not trigger any change, just shift cursor to the left
      return;
    }

    const startIndex = caretPosStart - 1;
    const endIndex = caretPosEnd;
    let removed = removeByIndex(currentValue, startIndex, endIndex);
    console.log("removed", removed);
    target.value = removed;
    setCaretPosStart(caretPosStart - 1);
    setCaretPosEnd(caretPosStart - 1);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.selectionStart = caretPosStart;
    inputRef.current.selectionEnd = caretPosEnd;
    console.log("useEffect start end:", caretPosStart, caretPosEnd);
  });

  return (
    <div>
      <input
        ref={inputRef}
        css={style}
        id={props.inputId}
        type="text"
        value={value}
        onChange={(e) => {
          e.preventDefault();
        }}
        onClick={(e: FormEvent<HTMLInputElement>) => {
          if (!inputRef.current || inputRef.current.selectionStart === null)
            return;
          setCaretPosStart(inputRef.current.selectionStart);
          setCaretPosEnd(inputRef.current.selectionStart);
        }}
        onInput={(e: FormEvent<HTMLInputElement>) => {
          e.preventDefault();
          renderNumber((e.target as HTMLInputElement).value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          const pressedKey: string = e.key;

          if (!inputRef.current || inputRef.current.selectionStart === null)
            return;

          if (pressedKey === "ArrowLeft") {
            const newPosition =
              inputRef.current.selectionStart === 0
                ? inputRef.current.selectionStart
                : inputRef.current.selectionStart - 1;
            setCaretPosStart(newPosition);
            setCaretPosEnd(newPosition);
          }

          if (pressedKey === "ArrowRight") {
            const newPosition =
              inputRef.current.selectionStart === inputRef.current.value.length
                ? inputRef.current.selectionStart
                : inputRef.current.selectionStart + 1;
            setCaretPosStart(newPosition);
            setCaretPosEnd(newPosition);
          }
          // if (/\d/.test(pressedKey)) {
          //   console.log(
          //     "pressedKey",
          //     pressedKey,
          //     inputRef.current.selectionStart,
          //     inputRef.current.selectionEnd
          //   );
          // }
          if (pressedKey === "Backspace") {
            backspace(e);
          }
        }}
        onKeyUp={(e) => {}}
      />
    </div>
  );
}
InputNumber.defaultProps = defaultProps;

export default InputNumber;
