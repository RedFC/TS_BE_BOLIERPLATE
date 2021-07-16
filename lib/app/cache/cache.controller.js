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
exports.Redis = void 0;
const redis_service_1 = require("./redis.service");
class Redis extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    getKeys(req, res) {
        const _super = Object.create(null, {
            getRedisKeys: { get: () => super.getRedisKeys }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                _super.getRedisKeys.call(this)
                    .then((data) => {
                    res.json(data);
                })
                    .catch((error) => res.json(error));
            }
            catch (error) {
                res.send({ success: false, message: error.message });
            }
        });
    }
    ;
    flushdb(req, res) {
        const _super = Object.create(null, {
            deleteRedisKeys: { get: () => super.deleteRedisKeys }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.pass == null) {
                    res.status(401).send({ success: false, message: "Missing credentials" });
                    return;
                }
                else if (req.body.pass == process.env.REDIS_PASS) {
                    _super.deleteRedisKeys.call(this)
                        .then((data) => {
                        res.json(data);
                    })
                        .catch((error) => res.json(error));
                }
                else {
                    res.status(401).send({ success: false, message: "Invalid credentials" });
                    return;
                }
            }
            catch (error) {
                res.send({ success: false, message: error.message });
            }
        });
    }
    ;
    flushAuth(req, res) {
        const _super = Object.create(null, {
            searchAndDeleteKeys: { get: () => super.searchAndDeleteKeys }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.pass == null || req.body.key == null) {
                    res.status(401).send({ success: false, message: "Missing credentials / key" });
                    return;
                }
                else if (req.body.pass == process.env.REDIS_PASS) {
                    _super.searchAndDeleteKeys.call(this, req.body.key)
                        .then((data) => {
                        res.json(data);
                    })
                        .catch((error) => res.json(error));
                }
                else {
                    res.status(401).send({ success: false, message: "Invalid credentials" });
                    return;
                }
            }
            catch (error) {
                res.send({ success: false, message: error.message });
            }
        });
    }
    ;
}
exports.Redis = Redis;
//# sourceMappingURL=cache.controller.js.map