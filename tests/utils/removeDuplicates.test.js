import { describe, it, expect } from "vitest";
import { removeDuplicates } from "../../src/utils/removeDuplicates";

describe("removeDuplicates", () => {
  it("should remove duplicate objects based on 'id' property", () => {
    const input = [
      { id: 1, name: "Cat A" },
      { id: 2, name: "Cat B" },
      { id: 1, name: "Cat A Duplicate" },
    ];
    const expected = [
      { id: 1, name: "Cat A" },
      { id: 2, name: "Cat B" },
    ];
    expect(removeDuplicates(input)).toEqual(expected);
  });

  it("should return an empty array when input is empty", () => {
    expect(removeDuplicates([])).toEqual([]);
  });

  it("should return the same array when there are no duplicates", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(removeDuplicates(input)).toEqual(input);
  });
});

it("should handle an array with a single object", () => {
  const input = [{ id: 1, name: "Single Cat" }];
  expect(removeDuplicates(input)).toEqual(input);
});

it("should handle an array with all duplicates", () => {
  const input = [
    { id: 1, name: "Cat A" },
    { id: 1, name: "Cat A Duplicate" },
    { id: 1, name: "Cat A Another Duplicate" },
  ];
  const expected = [{ id: 1, name: "Cat A" }];
  expect(removeDuplicates(input)).toEqual(expected);
});

it("should handle objects with different properties but the same 'id'", () => {
  const input = [
    { id: 1, name: "Cat A" },
    { id: 1, age: 2 },
    { id: 2, name: "Cat B" },
  ];
  const expected = [
    { id: 1, name: "Cat A" },
    { id: 2, name: "Cat B" },
  ];
  expect(removeDuplicates(input)).toEqual(expected);
});
