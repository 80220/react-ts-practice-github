import "./styles.css";
import { useEffect, useState } from "react";
import Chips from "./components/Chips";
import InputNumber from "./components/InputNumber";
import Diagram from "./components/Diagram";

export default function App() {
  const [chipValues, setChipValues] = useState<string[]>([]);
  const [inputNumber1, setInputNumber1] = useState<string>("");
  const [inputNumber2, setInputNumber2] = useState<string>("");
  const [inputNumber3, setInputNumber3] = useState<string>("");

  useEffect(() => {}, []);

  return (
    <div className="App">
      <h3 style={{ textAlign: "left" }}>Chips</h3>
      <Chips
        values={chipValues}
        onChange={(e: any) => {
          setChipValues(e.value);
        }}
      />
      <h3 style={{ textAlign: "left" }}>InputNumber</h3>
      <div
        style={{
          width: "min-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "start"
        }}
      >
        <label htmlFor="integeronly" style={{ fontSize: "12px" }}>
          Integer Only
        </label>
        <InputNumber
          inputId="integeronly"
          value={inputNumber1}
          onValueChange={(e: any) => {
            setInputNumber1(e.value);
          }}
        />
        <label htmlFor="withoutgrouping" style={{ fontSize: "12px" }}>
          Without Grouping
        </label>
        <InputNumber
          inputId="withoutgrouping"
          value={inputNumber2}
          onValueChange={(e: any) => {
            setInputNumber2(e.value);
          }}
          useGrouping={false}
        />
        <label htmlFor="minmaxfraction" style={{ fontSize: "12px" }}>
          Min-Max Fraction Digits
        </label>
        <InputNumber
          inputId="minmaxfraction"
          value={inputNumber3}
          onValueChange={(e: any) => {
            setInputNumber3(e.value);
          }}
          minFractionDigits={2}
          maxFractionDigits={5}
        />
      </div>
      <h3 style={{ textAlign: "left" }}>Diagram</h3>
      <Diagram size="120px" />
    </div>
  );
}
