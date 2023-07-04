module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended"],
  plugins: ["prettier"],

  rules: {
    "prettier/prettier": 1,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {},
    },
    {
      files: ["*.js", "*.jsx"],
      extends: [],
      rules: {},
    },
    {
      files: ["*.spec.ts", "*.spec.tsx"],
      env: {
        jest: true,
      },
      plugins: ["jest"],
      rules: {},
    },
  ],
};
