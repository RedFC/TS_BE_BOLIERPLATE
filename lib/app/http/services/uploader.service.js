"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const client_1 = require("@prisma/client");
class ImageService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=uploader.service.js.map