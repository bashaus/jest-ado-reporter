import AdoJestReporter from "./reporter";
import { AggregatedResultTestSuitePartial } from "./types/AggregatedResultTestSuitePartial";

describe("JestAdoReporter", () => {
  it("should show an interim percent", () => {
    const reporter = new AdoJestReporter({}, { enabled: false });
    const spySetProgress = jest.spyOn(reporter, "_setProgress");
    spySetProgress.mockImplementation();

    reporter._init();
    expect(spySetProgress).toHaveBeenCalledWith(1);

    const result: AggregatedResultTestSuitePartial = {
      numFailedTestSuites: 1,
      numPassedTestSuites: 0,
      numPendingTestSuites: 0,
      numRuntimeErrorTestSuites: 0,
      numTotalTestSuites: 2,
    };

    reporter.onTestFileResult(null, null, result);
    expect(spySetProgress).toHaveBeenCalledWith(50);
  });

  it("should do nothing for getLastError", () => {
    const reporter = new AdoJestReporter({}, { enabled: false });
    expect(reporter.getLastError()).toBeUndefined();
  });

  it("should do nothing for onRunStart", () => {
    const reporter = new AdoJestReporter({}, { enabled: false });
    expect(reporter.onRunStart()).toBeUndefined();
  });

  it("should do nothing for onRunComplete", () => {
    const reporter = new AdoJestReporter({}, { enabled: false });
    expect(reporter.onRunComplete()).toBeUndefined();
  });

  describe("enabled", () => {
    it("should not console log when false", () => {
      const reporter = new AdoJestReporter({}, { enabled: false });
      const spyConsoleLog = jest.spyOn(global.console, "log");
      spyConsoleLog.mockImplementation();

      reporter._setProgress(10);
      expect(spyConsoleLog).not.toHaveBeenCalled();
    });

    it("should console log when true", () => {
      const reporter = new AdoJestReporter({}, { enabled: true });
      const spyConsoleLog = jest.spyOn(global.console, "log");
      spyConsoleLog.mockImplementation();

      reporter._setProgress(10);
      expect(spyConsoleLog).toHaveBeenCalledWith(
        "##vso[task.setprogress value=10;]jest"
      );
    });
  });
});
