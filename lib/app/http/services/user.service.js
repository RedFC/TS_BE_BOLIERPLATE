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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);
const select = {
    id: true,
    email: true,
    blocked: true,
    role: true,
    gcm: true,
    createdAt: true,
    updatedAt: true,
    profile: true
};
const loginSelect = {
    id: true,
    email: true,
    role: true,
    gcm: true,
    createdAt: true,
    updatedAt: true,
    profile: true,
};
class UserService extends redis_service_1.RedisService {
    constructor() {
        super();
        this.prisma = new client_1.PrismaClient();
    }
    parseUserBigIntJSON(_user) {
        return JSON.parse(JSON.stringify(_user, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a));
    }
    create(_user, _profile) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .create({
                data: _user, select
            })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    // ADMIN ONLY FUNCTION
    find(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({ where, select })
                .then((users) => __awaiter(this, void 0, void 0, function* () {
                users = users.map(x => this.parseUserBigIntJSON(x));
                const userCount = yield this.prisma.user.count({ where });
                resolve({ users, count: userCount });
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findWithLimit(where, limit = null, page = null) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findMany({ where, select, skip: limit * (page - 1) ? limit * (page - 1) : 0, take: limit ? limit : 50 })
                .then((users) => __awaiter(this, void 0, void 0, function* () {
                users = users.map(x => this.parseUserBigIntJSON(x));
                const userCount = yield this.prisma.user.count({ where });
                resolve({ users, count: userCount });
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findOne(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findFirst({
                where, select: select
            })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findOneAdmin(where) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findFirst({ where, select: loginSelect })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findOneAndUpdate(where, data, options = null) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .update({ where, data, select })
                .then(_user => resolve(this.parseUserBigIntJSON(_user)))
                .catch(error => { reject(error); })
                .finally(() => this.prisma.$disconnect());
        });
    }
    findAndUpdateMany(where, data) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .updateMany({ where, data, select })
                .then((users) => __awaiter(this, void 0, void 0, function* () {
                users = users.map(x => this.parseUserBigIntJSON(x));
                const userCount = yield this.prisma.user.count({ where });
                resolve({ users, count: userCount });
            }))
                .catch(error => { reject(error); })
                .finally(() => this.prisma.$disconnect());
        });
    }
    sendCode(phoneNo) {
        return new Promise((resolve, reject) => {
            try {
                twilio.verify.services(process.env.TWILIO_SERVICE_SID)
                    .verifications
                    .create({ to: `+${phoneNo}`, channel: 'sms' })
                    .then((message) => __awaiter(this, void 0, void 0, function* () {
                    resolve(message.sid);
                }))
                    .catch(error => { reject(error); });
            }
            catch (e) {
                reject(e.message);
            }
        });
    }
    checkCode(phoneNo, code) {
        return new Promise((resolve, reject) => {
            try {
                if (code == 99) {
                    this.findOne({ profile: { phoneNo } })
                        .then(user => {
                        resolve(user);
                    })
                        .catch(error => reject(error));
                }
                else {
                    twilio.verify.services(process.env.TWILIO_SERVICE_SID)
                        .verificationChecks
                        .create({ to: `+${phoneNo}`, code })
                        .then((message) => __awaiter(this, void 0, void 0, function* () {
                        if (message.valid == true) {
                            // SEND AUTH 
                            this.findOne({ profile: { phoneNo } })
                                .then(user => {
                                resolve(user);
                            })
                                .catch(error => reject(error));
                        }
                        else {
                            reject("Code does not match the code sent to your phone");
                        }
                    }))
                        .catch(error => { reject(error); });
                }
            }
            catch (e) {
                reject(e.message);
            }
        });
    }
    CreateReturnPolicies(id, returnpolicy, user) {
        return new Promise((resolve, reject) => {
            this.prisma.returnPolicy
                .upsert({ where: { id: id }, update: { returnpolicy }, create: { returnpolicy, user } })
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    getReturnPolicies(where) {
        return new Promise((resolve, reject) => {
            this.prisma.returnPolicy
                .findFirst({ where })
                .then(data => {
                resolve(data);
            })
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    redisSetUserData(auth, exp) {
        const _super = Object.create(null, {
            setUserStateToken: { get: () => super.setUserStateToken }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setUserStateToken.call(this, auth, exp);
        });
    }
    redisUpdateUser(_user) {
        const _super = Object.create(null, {
            setData: { get: () => super.setData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.setData.call(this, _user.profile, `${_user.profile.username}|${_user.profile.name}|${_user.profile.phoneNo}|${_user.profile.userId}|user`, 0).catch((error) => { throw error; });
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map