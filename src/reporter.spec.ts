import AdoJestReporter from "./reporter";
import { AggregatedResultTestSuitePartial } from "./types/AggregatedResultTestSuitePartial";

describe("JestAdoReporter", () => {
  it("should show an interim percentage", () => {
    const reporter = new AdoJestReporter({}, { enabled: true });
    const spySetPercentage = jest.spyOn(reporter, "_setPercentage");
    spySetPercentage.mockImplementation();

    reporter.onRunStart();
    expect(spySetPercentage).toHaveBeenCalledWith(0);

    const result: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 0,
      numPendingTestSuites: 0,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 2,
    };

    reporter.onTestFileResult(null, null, result);
    expect(spySetPercentage).toHaveBeenCalledWith(50);
  });

  it("should set 100% on complete", () => {
    const reporter = new AdoJestReporter({}, { enabled: true });
    const spySetPercentage = jest.spyOn(reporter, "_setPercentage");
    spySetPercentage.mockImplementation();

    reporter.onRunComplete();
    expect(spySetPercentage).toHaveBeenCalledWith(100);
  });

  it("should do nothing for getLastError", () => {
    const reporter = new AdoJestReporter({}, { enabled: true });
    expect(reporter.getLastError()).toBeUndefined();
  });

  describe("enabled", () => {
    it("should not console log when false", () => {
      const reporter = new AdoJestReporter({}, { enabled: false });
      const spyConsoleLog = jest.spyOn(global.console, "log");
      spyConsoleLog.mockImplementation();

      reporter._setPercentage(10);
      expect(spyConsoleLog).not.toHaveBeenCalled();
    });

    it("should console log when true", () => {
      const reporter = new AdoJestReporter({}, { enabled: true });
      const spyConsoleLog = jest.spyOn(global.console, "log");
      spyConsoleLog.mockImplementation();

      reporter._setPercentage(10);
      expect(spyConsoleLog).toHaveBeenCalledWith(
        "##vso[task.setprogress value=10;]jest"
      );
    });
  });
});
