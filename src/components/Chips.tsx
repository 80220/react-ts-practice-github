// https://www.primefaces.org/primereact/showcase/#/chips
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import Icons from "./Icons";
interface Props {
  values: string[];
  onChange: Function;
}

const backgroundColor = "#e3f2fd";
const borderColor = "#2196f3";
const ulCSS = css`
  display: flex;
  flex-wrap: wrap;
  padding: 2px 2px 2px 2px;
  border: 1px solid ${borderColor};
`;

const ulInputFocusedCSS = css`
  ${ulCSS}
  box-shadow: 0 0 0 3px #a6d5fa;
`;

const liCSS = css`
  display: flex;
  /* list-style-type: none; */
  background: ${backgroundColor};
  margin: 3px;
  border-radius: 5px;
`;

const liInputCSS = css`
  padding-top: 4px;
  list-style-type: none; /* to remove list bullets */
  flex: 1; /* to make input strech to the end */
`;

const inputCSS = css`
  width: 100%; /* make it extend whole containing parent */
  min-width: 150px; /* to make input field wrap to next line for wider input field */
  border: none;
  border-color: transparent;
  outline: none; /* no border when focused */
  padding: 0;
`;

const chipCSS = css`
  text-align: left;
  padding: 2px 4px 4px 4px;
  overflow-wrap: anywhere; /* wrapping text inside of chip */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 0.9em;
`;

const buttonRemoveCSS = css`
  cursor: pointer;
  padding-left: 1px;
  padding-right: 4px;
  padding-top: 4px;
  /* set button size */
  height: 1em;
  width: 1em;
  min-height: 1em;
  min-width: 1em;
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
      <ul css={inputFocused ? ulInputFocusedCSS : ulCSS}>
        {values.map((v, index) => {
          return (
            <li key={counter.current++} css={liCSS}>
              <span css={chipCSS}>{v}</span>
              <div
                css={buttonRemoveCSS}
                onClick={() => {
                  removeChip(index);
                }}
                onMouseDown={(e) => {
                  e.preventDefault(); /* to allow onclick propagate after onblur */
                }}
              >
                <svg viewBox="0 0 72.434 72.44">
                  <use href="#cancel-icon" />
                </svg>
              </div>
            </li>
          );
        })}
        <li css={liInputCSS}>
          <label>
            <input
              css={inputCSS}
              type="text"
              onKeyDown={(e: any) => {
                if (e.code === "Enter") {
                  if (e.target.value.length > 0) createChip(e.target.value);
                  e.target.value = "";
                }
              }}
              onFocus={() => {
                setInputFocused(true);
              }}
              onBlur={() => {
                setInputFocused(false);
              }}
            ></input>
          </label>
        </li>
      </ul>
    </div>
  );
}
export default Chips;
