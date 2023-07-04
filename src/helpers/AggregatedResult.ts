import { AggregatedResultTestSuitePartial } from "../types/AggregatedResultTestSuitePartial";

export const calculatePercentage = (
  result: AggregatedResultTestSuitePartial
) => {
  const numTotalTestSuites = result.numTotalTestSuites;

  /**
   * Division by zero test suites is NaN, when there are no test suites to run,
   * we will mark the suite as completed
   */
  if (numTotalTestSuites === 0) {
    return 100;
  }

  const numCompleteTestSuites =
    result.numFailedTestSuites +
    result.numPassedTestSuites +
    result.numPendingTestSuites +
    result.numRuntimeErrorTestSuites;

  return Math.floor((numCompleteTestSuites / numTotalTestSuites) * 100);
};
