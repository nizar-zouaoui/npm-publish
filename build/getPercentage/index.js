"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const divide_1 = __importDefault(require("./mult/divide"));
function getPercentage(value, total) {
    console.log((0, date_fns_1.format)(new Date(), "yyyy-MM-dd HH:mm:ss") +
        " - getPercentage.ts - getPercentage");
    return (0, divide_1.default)(value, total) * 100;
}
exports.default = getPercentage;
