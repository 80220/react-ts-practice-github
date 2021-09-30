// https://www.primefaces.org/primereact/showcase/#/chips
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";
// type F = (values: string[]) => void;
interface Props {
  values: string[];
  onChange: Function;
}

const styleUl = css`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: start; */
  border: solid 1px;
  padding: 0;
`;
const styleLi = css`
  list-style-type: none;
`;

const styleLiInput = css`
  list-style-type: none;
`;

const styleInput = css`
  width: auto;
  border: none;
  border-color: transparent;
  outline: none;
`;

function Chips(props: Props) {
  const { values, onChange } = props;
  const counter = useRef(0);
  const createNewChip = (value: string) => {
    onChange({ value: [...values, value] });
  };
  return (
    <div>
      <ul css={styleUl}>
        {values.map((v) => {
          return (
            <li key={counter.current++} css={styleLi}>
              <span>{v}</span>
              <button>(x)</button>
            </li>
          );
        })}
        <li css={styleLiInput}>
          <input
            css={styleInput}
            type="text"
            onKeyDown={(e: any) => {
              if (e.code === "Enter") {
                createNewChip(e.target.value);
                e.target.value = "";
              }
            }}
          ></input>
        </li>
      </ul>
    </div>
  );
}
export default Chips;
