/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  tabWidth: 2,
  endOfLine: "lf",
  printWidth: 120,
  singleQuote: false,
  trailingComma: "es5",
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "^@/app/(.*)$",
    "^@/core/(.*)$",
    "^@/utils/(.*)$",
    "^@/components/(.*)$",
    "^@/views/(.*)$",
    "^@/styles/(.*)$",
    "",
    "^[./]",
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};
