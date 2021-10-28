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

  const createSlotChart = () => {
    const regex = new RegExp(/(^[a-z]$)|(^[A-Z]$)|(^[0-9]$)/);
    let s = "";
    for (let i = 0; i < props.mask.length; i++) {
      const ch = props.mask.charAt(i);
      if (regex.test(ch)) s += "_";
      else s += ch;
    }

    return s;
  };

  const [slotChar, setSlotChar] = useState<string>(
    props.slotChar || createSlotChart()
  );
  const alterValue = (ch: string) => {
    let currentValue = props.value;
    let mask = props.mask;
    let newValue = "";
    props.onChange({ value: newValue });
    setCaretPosStart(caretPosStart + 1);
    setCaretPosEnd(caretPosEnd + 1);
  };
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const key: string = e.key;
    if (!validateKey(key)) return e.preventDefault();
    if (key === "Backspace") {
    } else if (key === "Delete") {
    } else if (key === "ArrowLeft") {
    } else if (key === "ArrowRight") {
    } else if (key === "Home") {
    } else if (key === "End") {
    } else {
      // alterValue(key);
    }
  };

  const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange({ value: e.target.value });
    e.preventDefault();
  };
  const onBlurHandler = () => {
    props.onChange({ value: props.mask });
    setIsFocused(false);
  };

  const onMouseClickHandler = (e: FormEvent<HTMLInputElement>) => {
    if (!inputRef.current || !inputRef.current.selectionStart) return;
    setCaretPosStart(inputRef.current.selectionStart);
    setCaretPosEnd(inputRef.current.selectionStart);

    if (isFocused) return;

    props.onChange({ value: slotChar });
    setIsFocused(true);
  };

  useEffect(() => {
    console.log("rendered");
  }, [props.value]);

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
