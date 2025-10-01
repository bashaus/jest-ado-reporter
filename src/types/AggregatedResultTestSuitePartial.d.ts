import type { AggregatedResult } from "@jest/reporters";

export type AggregatedResultTestSuitePartial = Pick<
  AggregatedResult,
  | "numTotalTestSuites"
  | "numFailedTestSuites"
  | "numPassedTestSuites"
  | "numPendingTestSuites"
  | "numRuntimeErrorTestSuites"
>;
