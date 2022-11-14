import multiplies from "./simpleFunction.js";
describe("simple test", () => {
  it("runs on commit", () => {
    expect(multiplies(3)).toEqual(6);
  });
});
