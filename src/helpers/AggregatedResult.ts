import { AggregatedResultTestSuitePartial } from "../types/AggregatedResultTestSuitePartial";

export function calculatePercent(
  result: AggregatedResultTestSuitePartial,
): number {
  const {
    numTotalTestSuites,
    numFailedTestSuites,
    numPassedTestSuites,
    numPendingTestSuites,
    numRuntimeErrorTestSuites,
  } = result;

  /**
   * Division by zero test suites is NaN, when there are no test suites to run,
   * we will mark the suite as completed
   */

  if (numTotalTestSuites === 0) {
    return 1;
  }

  const numCompleteTestSuites =
    numFailedTestSuites +
    numPassedTestSuites +
    numPendingTestSuites +
    numRuntimeErrorTestSuites;

  return numCompleteTestSuites / numTotalTestSuites;
}
