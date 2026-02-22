import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    extends: [...nextCoreWebVitals, ...compat.extends("prettier")],

    plugins: {
      "unused-imports": unusedImports,
    },

    settings: {
      next: {
        rootDir: true,
      },
    },

    rules: {
      "react/jsx-key": [
        "error",
        {
          warnOnDuplicates: true,
          checkKeyMustBeforeSpread: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "react/hook-use-state": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-pascal-case": "warn",
      "react/jsx-props-no-multi-spaces": "warn",
      "react/jsx-closing-tag-location": "warn",
      "unused-imports/no-unused-imports": "warn",
      "import/no-anonymous-default-export": [
        "warn",
        {
          allowArray: true,
        },
      ],
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_$",
          args: "none",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_$",
        },
      ],

      "tailwindcss/no-custom-classname": "off",
      "@next/next/no-html-link-for-pages": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
