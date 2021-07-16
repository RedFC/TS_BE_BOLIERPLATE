"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.verificationRouter = express_1.default.Router();
const verification_controller_1 = require("./verification.controller");
let verification_obj = new verification_controller_1.Verification();
//# sourceMappingURL=index.js.map