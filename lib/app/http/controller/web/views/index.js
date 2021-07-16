"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.viewsRouter = express_1.default.Router();
const views_controller_1 = require("./views.controller");
let views_controller = new views_controller_1.Views();
const passport_1 = __importDefault(require("../../../middleware/passport"));
exports.viewsRouter.get('/', views_controller.index);
exports.viewsRouter.get('/login', views_controller.login);
exports.viewsRouter.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
exports.viewsRouter.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/error' }), views_controller.social_callback);
exports.viewsRouter.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: ['public_profile', 'email'] }));
exports.viewsRouter.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/error' }), views_controller.social_callback);
exports.viewsRouter.get('/*', views_controller.not_found);
//# sourceMappingURL=index.js.map