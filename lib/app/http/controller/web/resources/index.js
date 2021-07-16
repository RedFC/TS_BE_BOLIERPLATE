"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.resourceRouter = express_1.default.Router();
const resources_controller_1 = require("./resources.controller");
let resources_controller = new resources_controller_1.Resources();
exports.resourceRouter.get('/images/:filename', resources_controller.public_image_get);
//# sourceMappingURL=index.js.map