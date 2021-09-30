import { render } from "react-dom";

import App from "./App";

let v;
if (v === 3) {
  let a = 1;
  console.log(a());
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
