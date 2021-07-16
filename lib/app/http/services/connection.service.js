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
exports.ConnectionService = void 0;
const client_1 = require("@prisma/client");
const user_service_1 = require("./user.service");
const select = {
    id: true,
    user: { select: { profile: true } },
    userId: true,
    following: { select: { profile: true } },
    followId: true
};
class ConnectionService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    create(_follow) {
        return new Promise((resolve, reject) => {
            this.prisma.follows
                .create({
                data: _follow, select
            })
                .then((_user) => __awaiter(this, void 0, void 0, function* () {
                //update following count of this user
                let myUserService = new user_service_1.UserService();
                let myUser = yield myUserService.findOne({ id: _follow.userId });
                this.prisma.profile
                    .update({
                    where: {
                        username: myUser.profile.username
                    },
                    data: {
                        following: BigInt(myUser.profile.following) + BigInt(1)
                    }
                }).then(updated => console.log(updated));
                //update followers count of other user 
                let otherUser = yield myUserService.findOne({ id: _follow.followId });
                this.prisma.profile
                    .update({
                    where: {
                        username: otherUser.profile.username
                    },
                    data: {
                        followers: BigInt(otherUser.profile.followers) + BigInt(1)
                    }
                }).then(updated => console.log(updated));
                resolve(_user);
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    find(where) {
        return new Promise((resolve, reject) => {
            this.prisma.follows
                .findMany({ where, select })
                .then((follows) => __awaiter(this, void 0, void 0, function* () {
                const followsCount = yield this.prisma.connection.count({ where });
                resolve({ follows, count: followsCount });
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    findOne(where) {
        return new Promise((resolve, reject) => {
            this.prisma.follows
                .findFirst({ where, select })
                .then((follows) => __awaiter(this, void 0, void 0, function* () {
                resolve(follows);
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    parseUserBigIntJSON(_user) {
        return JSON.parse(JSON.stringify(_user, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a));
    }
    findOneAndGetConnections(where, limit = null, page = null) {
        return new Promise((resolve, reject) => {
            this.prisma.user
                .findFirst({
                where, select: {
                    profile: true,
                    followers: {
                        select: { following: { select: { profile: true } } },
                        skip: limit * (page - 1) ? limit * (page - 1) : 0, take: limit ? limit : 50
                    },
                    following: {
                        select: { user: { select: { profile: true } } },
                        skip: limit * (page - 1) ? limit * (page - 1) : 0, take: limit ? limit : 50
                    }
                }
            })
                .then((_follow) => __awaiter(this, void 0, void 0, function* () {
                let { id } = where;
                let orQuery = [
                    { followId: id },
                    { userId: id },
                ];
                let serializedFollow = this.parseUserBigIntJSON(_follow);
                const followsCount = yield this.prisma.follows.count({ where: { OR: orQuery } });
                resolve({ profile: serializedFollow.profile, followers: serializedFollow.followers, following: serializedFollow.following, count: followsCount });
            }))
                .catch(error => { console.log(error); reject(error); })
                .finally(() => this.prisma.$disconnect());
        });
    }
    findWithLimit(where, limit = null, page = null) {
        return new Promise((resolve, reject) => {
            this.prisma.follows
                .findMany({ where, select, skip: limit * (page - 1) ? limit * (page - 1) : 0, take: limit ? limit : 50 })
                .then((follows) => __awaiter(this, void 0, void 0, function* () {
                const followsCount = yield this.prisma.follows.count({ where });
                resolve({ follows, count: followsCount });
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
    delete(where) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let oldFollow = yield this.findOne(where);
            this.prisma.follows
                .delete({
                where: { id: oldFollow.id },
            }).then((_follow) => __awaiter(this, void 0, void 0, function* () {
                //update following count of this user
                let myUserService = new user_service_1.UserService();
                let myUser = yield myUserService.findOne({ id: _follow.userId });
                this.prisma.profile
                    .update({
                    where: {
                        username: myUser.profile.username
                    },
                    data: {
                        following: BigInt(myUser.profile.following) - BigInt(1)
                    }
                }).then(updated => console.log(updated));
                //update followers count of other user 
                let otherUser = yield myUserService.findOne({ id: _follow.followId });
                this.prisma.profile
                    .update({
                    where: {
                        username: otherUser.profile.username
                    },
                    data: {
                        followers: BigInt(otherUser.profile.followers) - BigInt(1)
                    }
                }).then(updated => console.log(updated));
                resolve(oldFollow);
            }))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        }));
    }
}
exports.ConnectionService = ConnectionService;
//# sourceMappingURL=connection.service.js.map