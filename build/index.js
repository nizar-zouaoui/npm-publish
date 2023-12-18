"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("./mult/helper"));
const add = (a, b) => {
    return a + b;
};
(0, helper_1.default)();
exports.default = add;
