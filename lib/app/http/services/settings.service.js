"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
class SettingsService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    createAboutus(data) {
        return new Promise((resolve, reject) => {
            this.prisma.aboutUs
                .create({ data })
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    updateAboutus(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.aboutUs
                .create(where, data)
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getAboutus() {
        return new Promise((resolve, reject) => {
            this.prisma.aboutus
                .findFirst()
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    // terms and condition
    createTerms(data) {
        return new Promise((resolve, reject) => {
            this.prisma.termsAndConditions
                .create({ data })
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    updateTerms(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.termsAndConditions
                .create(where, data)
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getTerms() {
        return new Promise((resolve, reject) => {
            this.prisma.termsAndConditions
                .findFirst()
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    // Return Policy
    createReturnPolicy(data) {
        return new Promise((resolve, reject) => {
            this.prisma.returnPolicy
                .create({ data })
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    updateReturnPolicy(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.returnPolicy
                .create(where, data)
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getReturnPolicy() {
        return new Promise((resolve, reject) => {
            this.prisma.returnPolicy
                .findFirst()
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
}
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map