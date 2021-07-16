"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
exports.connectionAdminRouter = express_1.default.Router();
const role_1 = require("../../../../middleware/role");
const validation_1 = require("../../../../middleware/validation");
const connection_admin_controller_1 = require("./connection.admin.controller");
let connection_controller = new connection_admin_controller_1.Connection();
let validation_controller = new validation_1.ValidationMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
//# sourceMappingURL=index.js.map