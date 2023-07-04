import { AggregatedResultTestSuitePartial } from "../types/AggregatedResultTestSuitePartial";
import { calculatePercentage } from "./AggregatedResult";

describe("calculatePercentage", () => {
  it("should return 100% when there are zero tests", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 0,
      numPassedTestSuites: 0,
      numPendingTestSuites: 0,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 0,
    };

    expect(calculatePercentage(aggregatedResult)).toBe(100);
  });

  it("should calculate from all test suite aggregations", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 1,
      numPendingTestSuites: 1,
      numRuntimeErrorTestSuites: 1,
      numTotalTestSuites: 4,
    };

    expect(calculatePercentage(aggregatedResult)).toBe(100);
  });

  it("should calculate incomplete tests", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 2,
      numPendingTestSuites: 3,
      numRuntimeErrorTestSuites: 4,
      numTotalTestSuites: 20,
    };

    expect(calculatePercentage(aggregatedResult)).toBe(50);
  });

  it("should round down the percentage", () => {
    const aggregatedResult: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 2,
      numPassedTestSuites: 2,
      numPendingTestSuites: 2,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 9,
    };

    expect(calculatePercentage(aggregatedResult)).toBe(66);
  });
});
