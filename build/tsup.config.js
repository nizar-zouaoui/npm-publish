"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsup_1 = require("tsup");
exports.default = (0, tsup_1.defineConfig)({
    entry: ["./*.ts", "./mult/*.ts"],
    splitting: false,
    sourcemap: true,
    clean: true,
});
