"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
class ProductService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    createCategory(schema) {
        return new Promise((resolve, reject) => {
            this.prisma.category
                .create({
                data: { name: schema }
            })
                .then(Category => resolve(Category))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    createSubCategory(name, categoryId) {
        return new Promise((resolve, reject) => {
            this.prisma.subCategory
                .create({
                data: { name: name, categoryId: categoryId }
            })
                .then(SubCategory => resolve(SubCategory))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getOneCategory(where) {
        return new Promise((resolve, reject) => {
            this.prisma.category
                .findFirst({ where })
                .then(Category => resolve(Category))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getOneSubCategory(where) {
        return new Promise((resolve, reject) => {
            this.prisma.subCategory
                .findFirst({ where })
                .then(SubCategory => resolve(SubCategory))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    // REDIS PRODUCT SERVICES
    setProductDataRedis(data) {
        data.map(data => {
            this.setData(data, `${data.id}|${data.title}|product`, 0);
        });
    }
    updateProductDataRedis(product) {
        this.setData(product, `${product.id}|${product.title}|product`, 0)
            .catch((error) => { throw error; });
    }
    deleteProductDataRedis(Key) {
        this.searchAndDeleteKeys(Key)
            .catch((error) => { throw error; });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map