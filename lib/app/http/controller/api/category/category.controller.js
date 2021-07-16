"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const error_service_1 = require("../../../services/error.service");
const product_service_1 = require("../../../services/product.service");
class Category {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_service_1.ProductService();
                let name = req.body.name;
                let createCategory = yield productService.createCategory(name.toLowerCase());
                if (createCategory) {
                    res.status(200).send({ success: true, data: createCategory, msg: "Category Has Been Created", status: 200 });
                }
                else {
                    res.status(500).send({ success: false, msg: "Some Error", status: 500 });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    createSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_service_1.ProductService();
                let _schema = { name: req.body.name, categoryId: req.body.categoryId };
                let createSubCategory = yield productService.createSubCategory(_schema.name.toLowerCase(), _schema.categoryId);
                if (createSubCategory) {
                    res.status(200).send({ success: true, data: createSubCategory, msg: "SubCategory Has Been Created", status: 200 });
                }
                else {
                    res.status(500).send({ success: false, msg: "Some Error", status: 500 });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.Category = Category;
//# sourceMappingURL=category.controller.js.map