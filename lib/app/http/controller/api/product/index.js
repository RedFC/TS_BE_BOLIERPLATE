"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../../middleware/auth");
exports.productRouter = express_1.default.Router();
const multer_1 = require("../../../../constants/multer");
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
const product_controller_1 = require("./product.controller");
const cache_1 = require("../../../middleware/cache");
let product_controller = new product_controller_1.Product();
let validation_controller = new validation_1.ValidationMiddleware();
let cache_controller = new cache_1.CacheMiddleware();
let auth_controller = new auth_1.AuthenticationMiddleware();
let role_controller = new role_1.RoleMiddleware();
exports.productRouter.post('/', auth_controller.isAuthenticated(), multer_1.upload.array('images'), validation_controller.validateProductCreate(), product_controller.create);
exports.productRouter.get('/', auth_controller.isAuthenticated(), product_controller.getAllproducts);
exports.productRouter.get('/search', cache_controller.productSearch(), product_controller.SearchProducts);
exports.productRouter.put('/:id', auth_controller.isAuthenticated(), validation_controller.validateProductRecord(), validation_controller.validateProductUpdate(), product_controller.update);
exports.productRouter.delete('/:id', auth_controller.isAuthenticated(), validation_controller.validateProductRecord(), product_controller.deleteProduct);
//# sourceMappingURL=index.js.map