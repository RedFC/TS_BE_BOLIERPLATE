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
exports.ValidateFollow = void 0;
const client_1 = require("@prisma/client");
class ValidateFollow {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    validate(_follow, { error, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validConnection = yield this.alreadyFollowing(_follow);
                this.alreadyFollowing(_follow);
                if (validConnection != "Not following this user")
                    return error(validConnection);
                return next(_follow);
            }
            catch (e) {
                return error(e);
            }
        });
    }
    validateUnFollow(_follow, { error, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validConnection = yield this.alreadyFollowing(_follow);
                this.alreadyFollowing(_follow);
                if (validConnection == "Not following this user")
                    return error(validConnection);
                return next(_follow);
            }
            catch (e) {
                return error(e);
            }
        });
    }
    alreadyFollowing(_follow) {
        return new Promise((resolve, reject) => {
            this.prisma.follows.findFirst({ where: { userId: _follow.userId, followId: _follow.followId } })
                .then(function (user) {
                if (user) {
                    return resolve("Already following this user");
                }
                return resolve("Not following this user");
            })
                .catch(function (e) {
                return reject(e.message);
            }).finally(() => {
                this.prisma.$disconnect();
            });
        });
    }
}
exports.ValidateFollow = ValidateFollow;
//# sourceMappingURL=follow.user.model.js.map