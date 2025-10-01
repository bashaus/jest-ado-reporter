import type { Reporter, Test, TestResult } from "@jest/reporters";
import type { Config } from "jest";

import { calculatePercent } from "./helpers/aggregated-result";
import type { AdoJestReporterOptions } from "./types/AdoJestReporterOptions";
import { AggregatedResultTestSuitePartial } from "./types/AggregatedResultTestSuitePartial";
import { lerp } from "./helpers/math";

export default class AdoJestReporter implements Reporter {
  private _name = "jest";
  private _enabled = process.env["TF_BUILD"] !== undefined;

  constructor(_config: Config, options: AdoJestReporterOptions) {
    if ("enabled" in options) {
      this._enabled = options.enabled;
    }

    this._init();
  }

  /**
   * When 0 is passed, the progress indication turns to the clock
   * Initialise the progress at 1%, to avoid falling back
   */
  _init() {
    this._setProgress(1);
  }

  /**
   * Writes a console log that ADO can read to update the state
   * @param percent number from 0 to 100
   */
  _setProgress(progress: number) {
    const value = Math.round(progress);

    if (this._enabled) {
      console.log(`##vso[task.setprogress value=${value};]${this._name}`);
    }
  }

  onRunStart() {
    /* no-op */
  }

  onTestFileResult(
    _test: Test,
    _testResult: TestResult,
    result: AggregatedResultTestSuitePartial,
  ) {
    const percent = calculatePercent(result);
    const value = lerp(1, 99, percent);
    this._setProgress(value);
  }

  onRunComplete() {
    /* no-op */
  }

  getLastError() {
    /* no-op */
  }
}
