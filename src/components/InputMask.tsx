// https://www.primefaces.org/primereact/showcase/#/inputmask
import {
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from "react";

interface Props {
  id: string;
  value: string | undefined;
  mask: string;
  placeholder: string | undefined;
  slotChar: string;
  onChange: ({ value }: { value: string }) => void;
}
const defaultProps = {
  slotChar: "",
  placeholder: undefined
};

const validateKey = (key: string) => {
  /* Allowed input:
  a - Alpha character (A-Z,a-z)
  9 - Numeric character (0-9)
  * - Alpha numberic character (A-Z,a-z,0-9)
  backspace/delete/arrow left right/
 */
  const regex = new RegExp(
    /(^[a-z]$)|(^[A-Z]$)|(^[0-9]$)|(^Backspace$)|(^Delete$)|(^ArrowLeft$)|(^ArrowRight$)||(^Home$)|(^End$)/g
  );
  return regex.test(key);
};

export default function InputMask(props: Readonly<Props>) {
  const inputRef = useRef<HTMLInputElement | null>(null); // to read caret position
  const [caretPosStart, setCaretPosStart] = useState<number>(0);
  const [caretPosEnd, setCaretPosEnd] = useState<number>(0);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  /* create slot if none provided by a user */
  const createSlotChart = () => {
    const separator = "_";
    const regex = new RegExp(/(^[a-z]$)|(^[A-Z]$)|(^[0-9]$)/);
    let s = "";
    for (let i = 0; i < props.mask.length; i++) {
      const ch = props.mask.charAt(i);
      if (regex.test(ch)) s += separator;
      else s += ch;
    }
    return s;
  };

  const [slotChar, setSlotChar] = useState<string>(
    props.slotChar || createSlotChart()
  );

  const getSeparators = (mask: any) => {
    const regex = new RegExp(/[a-zA-Z0-9]/g);
    return Array.from(mask.replaceAll(regex, ""));
  };

  const alterValue = (ch: string) => {
    let currentValue = String(props.value);
    const separators = getSeparators(props.mask);
    let index = caretPosStart;
    while (separators.indexOf(currentValue[index]) !== -1) index++;
    if (index === props.mask.length) return;
    let newValue =
      currentValue.substr(0, index) + ch + currentValue.substr(index + 1);
    props.onChange({ value: newValue });
    setCaretPosStart(index + 1);
    setCaretPosEnd(index + 1);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const key: string = e.key;
    if (!validateKey(key)) return e.preventDefault();
    if (key === "Backspace") {
    } else if (key === "Delete") {
    } else if (key === "ArrowLeft") {
      if (!inputRef.current || inputRef.current.selectionStart === null) return;
      const newPosition =
        inputRef.current.selectionStart === 0
          ? inputRef.current.selectionStart
          : inputRef.current.selectionStart - 1;
      setCaretPosStart(newPosition);
      setCaretPosEnd(newPosition);
    } else if (key === "ArrowRight") {
      if (!inputRef.current || inputRef.current.selectionStart === null) return;
      const newPosition =
        inputRef.current.selectionStart === inputRef.current.value.length
          ? inputRef.current.selectionStart
          : inputRef.current.selectionStart + 1;
      setCaretPosStart(newPosition);
      setCaretPosEnd(newPosition);
    } else if (key === "Home") {
    } else if (key === "End") {
    } else {
      alterValue(key);
      e.preventDefault();
    }
  };

  const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange({ value: e.target.value });
    e.preventDefault();
  };
  const onBlurHandler = () => {
    props.onChange({ value: "" });
    setIsFocused(false);
  };

  const onMouseClickHandler = (e: FormEvent<HTMLInputElement>) => {
    if (!inputRef.current || inputRef.current.selectionStart === null) return;

    setCaretPosStart(inputRef.current.selectionStart);
    setCaretPosEnd(inputRef.current.selectionStart);

    if (isFocused) return;

    props.onChange({ value: slotChar });
    setIsFocused(true);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.selectionStart = caretPosStart;
    inputRef.current.selectionEnd = caretPosEnd;
  }, [props.value, caretPosStart, caretPosEnd]);

  return (
    <input
      ref={inputRef}
      placeholder={props.mask}
      onKeyDown={keyDownHandler}
      value={props.value}
      onChange={onChangehandler}
      onClick={onMouseClickHandler}
      onBlur={onBlurHandler}
    />
  );
}

InputMask.defaultProps = defaultProps;
