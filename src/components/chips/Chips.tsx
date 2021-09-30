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
`;
const styleLi = css`
  list-style-type: none;
`;

const styleLiInput = css`
  list-style-type: none;
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
            </li>
          );
        })}
        <li css={styleLiInput}>
          <input
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
