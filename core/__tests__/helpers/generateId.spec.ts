import { generateId } from "../../src/helpers/generateId";

it("generates a new id every time its run", () => {
  const ids: string[] = Array(100)
    .fill("")
    .map(() => generateId());

  const numberOfIds = ids.length;
  const numberOfUniqueIds = new Set(ids).size;

  expect(numberOfIds).toBe(numberOfUniqueIds);
});
