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
exports.ValidateProfile = void 0;
const client_1 = require("@prisma/client");
class ValidateProfile {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    validate(_profile, { error, next }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let validUsername = yield this.username(_profile.username);
                if (validUsername != "")
                    return error(validUsername);
                if (_profile.phoneNo != null) {
                    let validPhone = yield this.phoneNo(_profile.phoneNo);
                    if (validPhone != "")
                        return error(validPhone);
                }
                return next(_profile);
            }
            catch (e) {
                return error(e.message);
            }
        });
    }
    phoneNo(phoneNo) {
        return new Promise((resolve, reject) => {
            this.prisma.profile.findUnique({ where: { phoneNo } })
                .then(profile => {
                if (profile) {
                    return resolve("The specified phone number is already in use.");
                }
                return resolve("");
            }).catch(function (e) {
                return reject(e.message);
            }).finally(() => {
                this.prisma.$disconnect();
            });
        });
    }
    username(username) {
        return new Promise((resolve, reject) => {
            this.prisma.profile.findUnique({ where: { username } })
                .then(profile => {
                if (profile) {
                    return resolve("The specified username is already in use.");
                }
                return resolve("");
            }).catch(function (e) {
                return reject(e.message);
            }).finally(() => {
                this.prisma.$disconnect();
            });
        });
    }
}
exports.ValidateProfile = ValidateProfile;
//# sourceMappingURL=profile.user.model.js.map