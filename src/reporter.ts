import type { Reporter } from "@jest/reporters";
import type { Config } from "jest";

import { calculatePercentage } from "./helpers/AggregatedResult";
import type { AdoJestReporterOptions } from "./types/AdoJestReporterOptions";
import { AggregatedResultTestSuitePartial } from "./types/AggregatedResultTestSuitePartial";

export default class AdoJestReporter implements Reporter {
  private _name = "jest";
  private _enabled = process.env.TF_BUILD !== undefined;

  constructor(_config: Config, options: AdoJestReporterOptions) {
    if ("enabled" in options) {
      this._enabled = options.enabled;
    }
  }

  /**
   * Writes a console log that ADO can read to update the state
   * @param percentage number from 0 to 100
   */
  _setPercentage(percentage: number) {
    if (this._enabled) {
      console.log(`##vso[task.setprogress value=${percentage};]${this._name}`);
    }
  }

  onRunStart() {
    this._setPercentage(0);
  }

  onTestFileResult(
    _test,
    _testResult,
    result: AggregatedResultTestSuitePartial
  ) {
    this._setPercentage(calculatePercentage(result));
  }

  onRunComplete() {
    this._setPercentage(100);
  }

  getLastError() {
    return undefined; /* noop */
  }
}
