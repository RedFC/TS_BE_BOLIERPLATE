"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const client_1 = require("@prisma/client");
const select = {
    id: true,
    cloudinaryId: true,
    path: true,
    type: true,
    createdAt: true,
    updatedAt: true,
};
class ImageService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map