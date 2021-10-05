import React from "react";
// import renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import Chips from "../components/Chips";

test("render 3 chips", () => {
  let chipValues: string[] = ["1", "2", "3"];
  const setChipValues: Function = (v: string[]) => {
    chipValues = v;
  };
  const { queryAllByText } = render(
    <Chips values={chipValues} onChange={setChipValues} />
  );
  let span;
  chipValues.forEach((v) => {
    span = queryAllByText(v)[0];
    expect(span.innerHTML).toBe(v);
  });
});
