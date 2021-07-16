"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Connection = void 0;
const _ = __importStar(require("lodash"));
const connection_service_1 = require("../../../services/connection.service");
const follow_user_model_1 = require("../../../models/follow.user.model");
const error_service_1 = require("../../../services/error.service");
const user_service_1 = require("../../../services/user.service");
class Connection {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = _.toInteger(req.query.limit);
                let page = _.toInteger(req.query.page);
                let { id } = req.params;
                const connectionService = new connection_service_1.ConnectionService();
                let { followers, following, count, profile } = yield connectionService.findOneAndGetConnections({ id }, limit, page);
                res.send({
                    profile, followers, following, success: true,
                    page: page,
                    pages: Math.ceil(count / limit),
                    count
                });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    follow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionValidate = new follow_user_model_1.ValidateFollow();
                connectionValidate.validate(req.body, {
                    error: (error) => error_service_1.ErrorService.handler(res, 400, { success: false, msg: error }),
                    next: () => __awaiter(this, void 0, void 0, function* () {
                        const connectionService = new connection_service_1.ConnectionService();
                        let _follow = yield connectionService.create(req.body);
                        const myUserService = new user_service_1.UserService();
                        myUserService.redisUpdateUser(_follow.following);
                        myUserService.redisUpdateUser(_follow.user);
                        res.send({ success: true, msg: `Now following ${_follow.following.profile.name} (@${_follow.following.profile.username})` });
                    })
                });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    unfollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionValidate = new follow_user_model_1.ValidateFollow();
                connectionValidate.validateUnFollow(req.body, {
                    error: (error) => error_service_1.ErrorService.handler(res, 400, { success: false, msg: error }),
                    next: () => __awaiter(this, void 0, void 0, function* () {
                        const connectionService = new connection_service_1.ConnectionService();
                        let _follow = yield connectionService.delete(req.body);
                        const myUserService = new user_service_1.UserService();
                        myUserService.redisUpdateUser(_follow.following);
                        myUserService.redisUpdateUser(_follow.user);
                        res.send({ success: true, msg: `Unfollowed ${_follow.following.profile.name} (@${_follow.following.profile.username})` });
                    })
                });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.controller.js.map