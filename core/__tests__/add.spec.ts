import { add } from "../src/index";

test("add_function_adds", () => {
  expect(add(1, 2)).toBe(3);
});
