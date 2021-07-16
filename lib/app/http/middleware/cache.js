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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const redis_service_1 = require("../../cache/redis.service");
const _ = __importStar(require("lodash"));
class CacheMiddleware extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    userSearch() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            let { id, key } = req.query;
            if (id != null && id != "" && id != undefined) {
                super.getData(`${id}|user|analytics|search`).then(data => super.setData(data !== null ? _.toInteger(data) + 1 : 1, `${id}|user|analytics|search`, 86400).catch((error) => { throw error; }));
                super.searchData(`*${id}|user`).then(users => {
                    if (users.length > 0) {
                        res.send({
                            success: true, user: users[0]
                        });
                    }
                    else {
                        next();
                    }
                }).catch((error) => {
                    res.status(500).send({ status: 500, success: false, msg: error.message });
                });
            }
            else if (key != null && key != "" && key != undefined) {
                super.searchData(`*${key}*|user`).then(users => {
                    if (users.length > 0) {
                        res.send({
                            success: true,
                            users,
                            page: null,
                            pages: null,
                            count: users.length
                        });
                    }
                    else {
                        next();
                    }
                }).catch((error) => {
                    res.status(500).send({ status: 500, success: false, msg: error.message });
                });
            }
            else {
                next();
            }
        }));
    }
    productSearch() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            let { id, key } = req.query;
            if (id != null && id != "" && id != undefined) {
                super.getData(`${id}|product|analytics|search`).then(data => super.setData(data !== null ? _.toInteger(data) + 1 : 1, `${id}|product|analytics|search`, 86400)
                    .catch((error) => { throw error; }));
                super.searchData(`${id}*|product`).then(products => {
                    if (products.length > 0) {
                        res.send({
                            success: true, product: products[0]
                        });
                    }
                    else {
                        next();
                    }
                }).catch((error) => {
                    res.status(500).send({ status: 500, success: false, msg: error.message });
                });
            }
            else if (key != null && key != "" && key != undefined) {
                super.searchData(`*${key}*|product`).then(products => {
                    if (products.length > 0) {
                        res.send({
                            success: true,
                            products,
                            page: null,
                            pages: null,
                            count: products.length
                        });
                    }
                    else {
                        next();
                    }
                }).catch((error) => {
                    res.status(500).send({ status: 500, success: false, msg: error.message });
                });
            }
            else {
                next();
            }
        }));
    }
}
exports.CacheMiddleware = CacheMiddleware;
//# sourceMappingURL=cache.js.map