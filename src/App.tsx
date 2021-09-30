import "./styles.css";
import { useEffect, useState } from "react";
import Chips from "./components/chips/Chips";

export default function App() {
  const [chipValues, setChipValues] = useState<string[]>([]);

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
    </div>
  );
}
