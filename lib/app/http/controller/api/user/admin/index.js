"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../../middleware/auth");
exports.userAdminRouter = express_1.default.Router();
const role_1 = require("../../../../middleware/role");
const validation_1 = require("../../../../middleware/validation");
const user_admin_controller_1 = require("./user.admin.controller");
let user_controller = new user_admin_controller_1.User();
let validation_controller = new validation_1.ValidationMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.userAdminRouter.post('/update', auth_controller.isAuthenticated(), role_controller.isAdmin(), validation_controller.validateAdminUserUpdate(), user_controller.update);
//# sourceMappingURL=index.js.map