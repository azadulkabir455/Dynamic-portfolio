import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["src/blocks/elements/3d/Silk/Silk.tsx"],
    rules: { "react/no-unknown-property": "off" },
  },
  {
    files: ["src/blocks/elements/3d/SplashCursor/SplashCursor.tsx"],
    rules: { "@typescript-eslint/consistent-type-imports": "off" },
  },
  {
    files: [
      "src/blocks/elements/3d/Particles/Particles.tsx",
      "src/components/Plasma.jsx",
    ],
    rules: { "react-hooks/exhaustive-deps": "off" },
  },
]);

export default eslintConfig;
