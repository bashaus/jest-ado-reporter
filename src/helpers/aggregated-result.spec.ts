import type { AggregatedResultTestSuitePartial } from "./aggregated-result";
import { calculatePercent } from "./aggregated-result";

describe("calculatePercent()", () => {
  it("should return 100% when there are zero tests", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 0,
      numPassedTestSuites: 0,
      numPendingTestSuites: 0,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 0,
    };

    expect(calculatePercent(aggregatedResult)).toBe(1);
  });

  it("should calculate from all test suite aggregations", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 1,
      numPendingTestSuites: 1,
      numRuntimeErrorTestSuites: 1,
      numTotalTestSuites: 4,
    };

    expect(calculatePercent(aggregatedResult)).toBe(1);
  });

  it("should calculate incomplete tests", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 2,
      numPendingTestSuites: 3,
      numRuntimeErrorTestSuites: 4,
      numTotalTestSuites: 20,
    };

    expect(calculatePercent(aggregatedResult)).toBe(0.5);
  });

  it("should round down the percent", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 2,
      numPassedTestSuites: 2,
      numPendingTestSuites: 2,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 9,
    };

    expect(calculatePercent(aggregatedResult)).toBe(2 / 3);
  });
});
