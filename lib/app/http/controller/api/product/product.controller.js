"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Product = void 0;
const _ = __importStar(require("lodash"));
const error_service_1 = require("../../../services/error.service");
const product_service_1 = require("../../../services/product.service");
const productImages_controller_1 = require("../productImages/productImages.controller");
class Product {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ImageUploads = new productImages_controller_1.ProductImages();
                const productService = new product_service_1.ProductService();
                const ParseTags = JSON.parse(req.body.tags);
                let Tags = ParseTags.map(x => {
                    return { where: { name: x }, create: { name: x } };
                });
                let Category = JSON.parse(req.body.categories);
                let _Parse = {
                    baseCost: Number(req.body.baseCost),
                    refundable: Boolean(req.body.refundable)
                };
                let _schema = {
                    published: req.body.published,
                    title: req.body.title,
                    description: req.body.description,
                    baseCost: _Parse.baseCost,
                    currency: req.body.currency,
                    refundable: _Parse.refundable,
                    authorId: req.body.authorId,
                    tags: {
                        connectOrCreate: Tags
                    },
                    user: {
                        connect: { id: req.user.id }
                    },
                    categories: {
                        connect: Category
                    },
                    images: null
                };
                let uploader = yield ImageUploads.uploader(req, res);
                if (uploader.length) {
                    let images = uploader.map(x => {
                        return { cloudinaryId: x.cloudinaryId };
                    });
                    _schema.images = {
                        connect: images
                    };
                }
                let createProduct = yield productService.createProduct(_schema);
                if (createProduct) {
                    res.status(200).send({ success: true, data: createProduct, msg: "Product Has Been Created", status: 200 });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    getAllproducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_service_1.ProductService();
                let getAllProducts = yield productService.getAllProducts({ OR: [{ isBlocked: false }, { userId: req.user.id }] });
                productService.setProductDataRedis(getAllProducts);
                res.status(200).send({ success: true, data: getAllProducts, msg: "Succesfully Fetched", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    SearchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = _.toInteger(req.query.limit);
                let page = _.toInteger(req.query.page);
                let { key, id } = req.query;
                let productService = new product_service_1.ProductService();
                if (id != null && id != "" && id != undefined) {
                    let Product = yield productService.getOneProduct({ id });
                    res.send({
                        success: true, data: Product
                    });
                }
                else {
                    let LikeQuery = { title: { contains: key } };
                    let { Products, count } = yield productService.getFilterProducts(LikeQuery, limit, page);
                    productService.setProductDataRedis(Products);
                    res.send({
                        success: true,
                        status: 200,
                        data: Products,
                        page: page,
                        pages: Math.ceil(count / limit),
                        count
                    });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_service_1.ProductService();
                let Tags;
                if (req.body.tags) {
                    Tags = req.body.tags.map(x => {
                        return { where: { name: x }, create: { name: x } };
                    });
                }
                let disconnectedTags;
                if (req.body.disconnectedTags) {
                    disconnectedTags = req.body.disconnectedTags.map(x => {
                        return { name: x };
                    });
                }
                let paramsId = req.params.id;
                let _schema = {
                    published: req.body.published,
                    title: req.body.title,
                    description: req.body.description,
                    baseCost: req.body.baseCost,
                    currency: req.body.currency,
                    refundable: req.body.refundable,
                    authorId: req.body.authorId,
                    tags: {
                        connectOrCreate: Tags,
                        disconnect: disconnectedTags
                    },
                    user: {
                        connect: { id: req.user.id }
                    },
                    categories: {
                        connect: req.body.categories,
                        disconnect: req.body.disconnectedCategories
                    }
                };
                let _disconnection = {
                    tags: {
                        disconnect: disconnectedTags
                    },
                    categories: {
                        disconnect: req.body.disconnectedCategories
                    }
                };
                let updateProduct = yield productService.updateProduct({ id: paramsId }, _schema, _disconnection);
                if (updateProduct) {
                    let getproduct = yield productService.getOneProduct({ id: paramsId });
                    if (getproduct) {
                        productService.updateProductDataRedis(getproduct);
                    }
                    return res.send({
                        success: true,
                        status: 200,
                        data: updateProduct,
                        msg: "Successfully Updated",
                    });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_service_1.ProductService();
                let deleteProduct = yield productService.deleteProduct({ id: req.params.id });
                if (deleteProduct) {
                    productService.deleteProductDataRedis(req.params.id);
                    return res.send({
                        success: true,
                        status: 200,
                        data: deleteProduct,
                        msg: "Successfully Deleted"
                    });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.Product = Product;
//# sourceMappingURL=product.controller.js.map