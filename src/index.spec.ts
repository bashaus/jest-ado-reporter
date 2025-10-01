import AdoJestReporter from ".";

describe("JestAdoReporter", () => {
  it("should default export AdoJestReporter", () => {
    expect(new AdoJestReporter({}, { enabled: false })).toBeInstanceOf(
      AdoJestReporter,
    );
  });
});
