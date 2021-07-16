"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.errorRouter = express_1.default.Router();
const error_controller_1 = require("./error.controller");
let error_controller = new error_controller_1.Error();
exports.errorRouter.get('/', function (req, res) { res.send("Error Logging In"); });
exports.errorRouter.get('/404', error_controller.not_found_page);
exports.errorRouter.get('/500', error_controller.internal_server_error);
//# sourceMappingURL=index.js.map