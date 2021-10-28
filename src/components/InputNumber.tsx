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
  minFractionDigits: 0,
  maxFractionDigits: 0
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

    let positionDiff = formatted.length - value.length;
    console.log(
      "caretPosStart formatted.length, value.length",
      caretPosStart,
      formatted,
      value,
      formatted.length,
      value.length
    );
    if (props.minFractionDigits && props.minFractionDigits > 0) {
      if (value.length === 0) {
        setCaretPosStart(1);
        setCaretPosEnd(1);
      }
      if (value.length > 0 && caretPosStart !== null) {
        setCaretPosStart(caretPosStart + 1);
        setCaretPosEnd(caretPosStart + 1);
      }
    } else {
      if (caretPosStart !== null && positionDiff > 0) {
        setCaretPosStart(caretPosStart + positionDiff);
        setCaretPosEnd(caretPosStart + positionDiff);
      }
    }
    onValueChange({ value: formatted });
  };

  const backspace = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.selectionStart === null) return; // https://html.spec.whatwg.org/multipage/input.html#do-not-apply

    if (!caretPosStart || !caretPosEnd) return;
    console.log("selection", caretPosStart, caretPosEnd);

    const currentValue = target.value;

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
    renderNumber(removed);
    target.value = removed;
    setCaretPosStart(caretPosStart - 1);
    setCaretPosEnd(caretPosStart - 1);
    e.preventDefault();
  };

  /* set caret position after each rendering */
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.selectionStart = caretPosStart;
    inputRef.current.selectionEnd = caretPosEnd;
    // console.log("useEffect start end:", caretPosStart, caretPosEnd);
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
          console.log(
            "(e.target as HTMLInputElement).value",
            (e.target as HTMLInputElement).value
          );
          renderNumber((e.target as HTMLInputElement).value);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (!inputRef.current || inputRef.current.selectionStart === null)
            return;
          const allowedKeys = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "Backspace",
            "ArrowLeft",
            "ArrowRight"
          ];
          const pressedKey: string = e.key;

          if (allowedKeys.indexOf(pressedKey) === -1) {
            return e.preventDefault();
          }
          /* read & save current cursor position */
          const newPosition = inputRef.current.selectionStart
            ? inputRef.current.selectionStart
            : 0;
          setCaretPosStart(newPosition);
          setCaretPosEnd(newPosition);

          /* handle navigation */
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
          /* handle digits erasure */
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
