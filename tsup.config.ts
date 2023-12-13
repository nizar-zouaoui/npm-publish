import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./*.ts", "./mult/*.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
