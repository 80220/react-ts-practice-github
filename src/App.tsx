import "./styles.css";
import { useEffect, useState } from "react";
import Chips from "./components/Chips";
import InputNumber from "./components/InputNumber";
import Diagram from "./components/Diagram";

export default function App() {
  const [chipValues, setChipValues] = useState<string[]>([]);
  const [inputNumber1, setInputNumber1] = useState<string>("");

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
      <InputNumber
        value={inputNumber1}
        onValueChange={(e: any) => {
          setInputNumber1(e.value);
        }}
      />
      <h3 style={{ textAlign: "left" }}>Diagram</h3>
      <Diagram size="120px" />
    </div>
  );
}
