import { Config } from "jest";

const config: Config = {
  coverageDirectory: "./coverage",
  transform: {
    "^.+\\.[tj]s$": "@swc/jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
};

export default config;
