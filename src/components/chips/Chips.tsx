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
  flex: 1;
`;

const styleInput = css`
  width: 99%;
  border: none;
  border-color: transparent;
  outline: none;
`;

const styleChip = css`
  border: 1px solid;
  padding: 0px 2px 0px 2px;
`;

const styleButtonRemove = css`
  border-radius: 50%;
`;

function Chips(props: Props) {
  const { values, onChange } = props;
  const counter = useRef(0);
  const createChip = (value: string) => {
    onChange({ value: [...values, value] });
  };
  const removeChip = (index: number) => {
    values.splice(index, 1);
    onChange({ value: [...values] });
  };
  return (
    <div>
      <ul css={styleUl}>
        {values.map((v, index) => {
          return (
            <li key={counter.current++} css={styleLi}>
              <span css={styleChip}>{v}</span>
              <button
                css={styleButtonRemove}
                onClick={() => {
                  removeChip(index);
                }}
              >
                X
              </button>
            </li>
          );
        })}
        <li css={styleLiInput}>
          <input
            css={styleInput}
            type="text"
            onKeyDown={(e: any) => {
              if (e.code === "Enter") {
                createChip(e.target.value);
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
