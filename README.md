# jest-ado-reporter

Reports jest test suite progress information to the pipeline step Azure DevOps. Useful for displaying progress when you have a lot of tests to run.

&nbsp;

<img src="./docs/recording.gif" width="250" alt="Screen recording of the progress example" />

&nbsp;

## Installation

Add the dependency to your application.

```bash
npm i --dev jest-ado-reporter
# - or -
yarn add -D jest-ado-reporter
```

You can then add the reporter to your jest configuration (e.g.: `jest.config.ts`)

```javascript
import type { Config } from "jest";

const config: Config = {
  reporters: ["default", "jest-ado-reporter" /* add this */],
};

export default config;
```

&nbsp;

## Options

### enabled

Type of `boolean`.

By default, the console will only output the required logging commands when running in Azure DevOps. You can debug this locally by setting the `enabled` option to `true`.

Example:

```javascript
['jest-ado-reporter', { enabled: true }],
```

Output (when used in parallel with `default`):

```bash
$ jest
##vso[task.setprogress value=0;]jest
 PASS   test5.spec.tsx
##vso[task.setprogress value=16;]jest
 PASS   test2.spec.tsx
##vso[task.setprogress value=33;]jest
 PASS   test4.spec.tsx
 PASS   test3.spec.ts
##vso[task.setprogress value=50;]jest
##vso[task.setprogress value=66;]jest
 PASS   test1.spec.ts
##vso[task.setprogress value=83;]jest
 PASS   test6.spec.tsx
##vso[task.setprogress value=100;]jest

Test Suites: 6 passed, 6 total
Tests:       18 passed, 18 total
Snapshots:   0 total
Time:        5.617 s
##vso[task.setprogress value=100;]jest
✨  Done in 9.97s.
```