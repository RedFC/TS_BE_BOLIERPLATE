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
exports.Blocked = void 0;
const block_service_1 = require("../../../services/block.service");
const user_service_1 = require("../../../services/user.service");
const error_service_1 = require("../../../services/error.service");
class Blocked {
    blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _schema = {
                    blockedId: req.params.id,
                    userId: req.user.id
                };
                const userService = new user_service_1.UserService();
                let getUser = yield userService.findOne({ id: _schema.blockedId });
                if (!getUser) {
                    return error_service_1.ErrorService.handler(res, 409, { success: false, msg: "User Not Found", status: 409 });
                }
                const myblockService = new block_service_1.BlockService();
                let getData = yield myblockService.getBlockedUser({ blockedId: _schema.blockedId, userId: _schema.userId }, { id: true, blockedId: true, userId: true });
                if (getData)
                    return error_service_1.ErrorService.handler(res, 409, { success: false, msg: "User Already Blocked", status: 409 });
                let datacreated = yield myblockService.create(_schema);
                if (datacreated) {
                    res.status(200).send({ success: true, data: datacreated, msg: "User Has Been Blocked", status: 200 });
                }
                else {
                    res.status(500).send({ success: false, msg: "Some Error", status: 500 });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    getMyBlockList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _schema = {
                    userId: req.user.id
                };
                const myblockService = new block_service_1.BlockService();
                let getData = yield myblockService.getMyBlockedUsers(_schema);
                res.status(200).send({ success: true, data: getData, msg: "Success", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    unBlockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _schema = {
                    userId: req.user.id,
                    blockedId: req.params.id
                };
                const userService = new user_service_1.UserService();
                let getUser = yield userService.findOne({ id: _schema.blockedId });
                if (!getUser) {
                    return error_service_1.ErrorService.handler(res, 409, { success: false, msg: "User Not Found", status: 409 });
                }
                const myblockService = new block_service_1.BlockService();
                let getData = yield myblockService.getBlockedUser({ blockedId: _schema.blockedId, userId: _schema.userId }, { id: true });
                if (!getData)
                    return error_service_1.ErrorService.handler(res, 409, { success: false, msg: "Blocked User Not Found", status: 409 });
                let unBlockUser = yield myblockService.unBlockUser(getData.id);
                res.status(200).send({ success: true, data: unBlockUser, msg: "Success", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.Blocked = Blocked;
//# sourceMappingURL=blocked.controller.js.map