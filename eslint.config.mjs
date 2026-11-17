import next from "eslint-config-next";

export default [
  ...next,
  {
    rules: {
      "react/jsx-no-target-blank": ["error", { allowReferrer: true }],
      "react/display-name": ["off", { ignoreTranspilerName: false }],
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  { files: ["**/*.js"], rules: { "import/no-anonymous-default-export": "off" } }
];
