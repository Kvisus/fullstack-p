import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  prettier,
  {
    plugins: ["react-component-name"],
    rules: {
      "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],

      "react-component-name/react-component-name": [
        "error",
        {
          targets: ["action", "computed", "effect", "reatomComponent"],
        },
      ],
    },
  },
]);

export default eslintConfig;
