import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginPromise from "eslint-plugin-promise";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {ignores: ["*.config.*"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  {
    rules: {
      "max-len": [1, 120, 2, { "ignoreComments": true }],
      "no-console": "off",
      "quotes": ["error", "single"],
      "camelcase": ["error", {"properties": "always"}],
      "semi": ["warn", "always"],
      "comma-dangle": ["warn", "only-multiline"],
      "dot-notation": "warn",
      "space-before-function-paren": "off",
      "indent": ["warn", 2],
      "padded-blocks": "warn",
      "no-trailing-spaces": "warn",
      "array-bracket-spacing": "warn",
      "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
      "padded-blocks": ["error", "never"],
      "no-var": "error",
      "promise/catch-or-return": "off",
      "promise/always-return": "off"
    },
  },
];