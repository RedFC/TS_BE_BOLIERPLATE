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
exports.User = void 0;
const user_service_1 = require("../../../../services/user.service");
const redis_service_1 = require("../../../../../cache/redis.service");
const error_service_1 = require("../../../../services/error.service");
class User extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    update(req, res) {
        const _super = Object.create(null, {
            setData: { get: () => super.setData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, name, about, blocked, email } = JSON.parse(JSON.stringify(req.body));
                let user = {
                    email,
                    blocked: (blocked == 'true'),
                };
                if (username != null || name != null || about != null) {
                    user['profile'] = {
                        update: {
                            username,
                            name,
                            about,
                        }
                    };
                }
                const myUserService = new user_service_1.UserService();
                myUserService
                    .findOneAndUpdate({ id: req.body.id }, user)
                    .then((user) => {
                    _super.setData.call(this, user.profile, `${user.profile.username}|${user.profile.name}|${user.profile.phoneNo}|${user.profile.userId}|user`, 0).catch((error) => { throw error; });
                    res.send({
                        success: true, user, msg: "User updated successfully"
                    });
                })
                    .catch((error) => {
                    error_service_1.ErrorService.handler(res, 500, { success: false, raw: error.message, status: 500 });
                });
            }
            catch (error) {
                res.status(500).send({ success: false, msg: error.message });
            }
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.admin.controller.js.map