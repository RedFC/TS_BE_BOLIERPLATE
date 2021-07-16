"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockService = void 0;
const client_1 = require("@prisma/client");
class BlockService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(blockedList) {
        return new Promise((resolve, reject) => {
            this.prisma.blockedList
                .create({
                data: blockedList,
            })
                .then(blockedList => resolve(blockedList))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getBlockedUser(where, select) {
        return new Promise((resolve, reject) => {
            this.prisma.blockedList
                .findFirst({ where, select })
                .then(blockedList => resolve(blockedList))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getMyBlockedUsers(blockedList) {
        return new Promise((resolve, reject) => {
            this.prisma.blockedList
                .findMany({ where: { userId: blockedList.userId }, select: { blocked: { select: { profile: { select: { userId: true, username: true, name: true, profileImage: true } } } } } })
                .then(blockedList => resolve(blockedList))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    unBlockUser(blockedList) {
        return new Promise((resolve, reject) => {
            this.prisma.blockedList
                .delete({ where: { id: blockedList } })
                .then(blockedList => resolve(blockedList))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
}
exports.BlockService = BlockService;
//# sourceMappingURL=block.service.js.map