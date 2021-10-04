// https://www.primefaces.org/primereact/showcase/#/chips
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import Icons from "../Icons";
// type F = (values: string[]) => void;
interface Props {
  values: string[];
  onChange: Function;
}

const ulBase = css`
  display: flex;
  flex-wrap: wrap;
  padding: 2px 2px 2px 2px;
`;
const styleUl = css`
  ${ulBase}
  border: 1px solid #2196f3;
`;

const styleInputFocused = css`
  ${ulBase}
  box-shadow: 0 0 0 0.2rem #a6d5fa;
`;

const styleLi = css`
  display: flex;
  list-style-type: none;
  background: #e3f2fd;
  margin: 5px;
`;

const styleLiInput = css`
  padding-top: 4px;
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
  text-align: left;
  background: #e3f2fd;
  padding: 0px 2px 0px 2px;
  overflow-wrap: anywhere;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 0.9em;
`;

const styleButtonRemove = css`
  cursor: pointer;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 2px;
  height: 15px;
  width: 15px;
  min-height: 15px;
  min-width: 15px;
`;

function Chips(props: Props) {
  const { values, onChange } = props;
  const counter = useRef(0);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const createChip = (value: string) => {
    onChange({ value: [...values, value] });
  };
  const removeChip = (index: number) => {
    values.splice(index, 1);
    onChange({ value: [...values] });
  };
  return (
    <div>
      <Icons />
      <ul css={inputFocused ? styleInputFocused : styleUl}>
        {values.map((v, index) => {
          return (
            <li key={counter.current++} css={styleLi}>
              <span css={styleChip}>{v}</span>
              <div
                css={styleButtonRemove}
                onClick={() => {
                  removeChip(index);
                }}
              >
                <svg viewBox="0 0 72.434 72.44">
                  <use href="#cancel-icon" />
                </svg>
              </div>
            </li>
          );
        })}
        <li css={styleLiInput}>
          <input
            css={styleInput}
            type="text"
            onKeyDown={(e: any) => {
              if (e.code === "Enter") {
                if (e.target.value.length > 0) createChip(e.target.value);
                e.target.value = "";
              }
            }}
            onFocus={(e) => {
              console.log("FOCUS");
              setInputFocused(true);
            }}
            onBlur={(e) => {
              console.log("UNFOCUS");
              setInputFocused(false);
            }}
          ></input>
        </li>
      </ul>
    </div>
  );
}
export default Chips;
