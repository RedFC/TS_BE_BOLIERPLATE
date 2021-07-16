"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.connectionRouter = express_1.default.Router();
const validation_1 = require("../../../middleware/validation");
const connection_controller_1 = require("./connection.controller");
let connection_controller = new connection_controller_1.Connection();
let validation_controller = new validation_1.ValidationMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
exports.connectionRouter.get("/:id", auth_controller.isAuthenticated(), connection_controller.get);
exports.connectionRouter.post("/follow", auth_controller.isAuthenticated(), validation_controller.validateConnectionFollow(), connection_controller.follow);
exports.connectionRouter.post("/unfollow", auth_controller.isAuthenticated(), validation_controller.validateConnectionFollow(), connection_controller.unfollow);
//# sourceMappingURL=index.js.map