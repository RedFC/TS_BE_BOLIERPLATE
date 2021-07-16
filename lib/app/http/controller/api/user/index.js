"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.userRouter = express_1.default.Router();
const multer_1 = require("../../../../constants/multer");
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const user_controller_1 = require("./user.controller");
const cache_1 = require("../../../middleware/cache");
let user_controller = new user_controller_1.User();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.userRouter.post('/', auth_controller.isAuthenticated(), role_controller.isUser(), validation_controller.validateUserUpdate(), multer_1.upload.fields([{ name: "image" }]), user_controller.update);
exports.userRouter.get('/', cache_controller.userSearch(), user_controller.get);
exports.userRouter.post('/register', validation_controller.validateUserRegistration(), user_controller.register);
exports.userRouter.post('/social/register', validation_controller.validateUserRegistration(), user_controller.social_register);
exports.userRouter.post('/login', validation_controller.validateUserLogin(), user_controller.login);
exports.userRouter.post('/verify', validation_controller.validateUserVerify(), user_controller.verify);
exports.userRouter.post('/logout', auth_controller.isAuthenticated(), user_controller.logout);
exports.userRouter.post('/returnPolicies', auth_controller.isAuthenticated(), validation_controller.validateReturnPolicy(), user_controller.createReturnPolicy);
//# sourceMappingURL=index.js.map