"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockedRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.blockedRouter = express_1.default.Router();
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const blocked_controller_1 = require("./blocked.controller");
const cache_1 = require("../../../middleware/cache");
let blocked_controller = new blocked_controller_1.Blocked();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.blockedRouter.post('/block/:id', auth_controller.isAuthenticated(), validation_controller.validateBlockRequest(), role_controller.isUser(), blocked_controller.blockUser);
exports.blockedRouter.get('/getMyblockedUsers', auth_controller.isAuthenticated(), role_controller.isUser(), blocked_controller.getMyBlockList);
exports.blockedRouter.delete('/unBlockUser/:id', auth_controller.isAuthenticated(), validation_controller.validateBlockRequest(), role_controller.isUser(), blocked_controller.unBlockUser);
//# sourceMappingURL=index.js.map