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
exports.RedisService = void 0;
const _ = __importStar(require("lodash"));
const redis_1 = require("redis");
const redisScan = require('node-redis-scan');
let client;
let scanner;
class RedisService {
    connect_cache() {
        console.log("❗ Connecting to Redis...");
        return new Promise((resolve, reject) => {
            let origin = {};
            if (process.env.NODE_ENV == "production") {
                origin = {
                    port: process.env.REDIS_PORT,
                    host: process.env.REDIS_HOST,
                    password: process.env.REDIS_PASS, // replace with your password
                };
            }
            client = redis_1.createClient(origin);
            client.on("error", function (err) {
                reject(err);
            });
            client.on("connect", function () {
                resolve("Redis Connected");
            });
        });
    }
    ;
    setUserStateToken(auth, exp) {
        return new Promise((resolve, reject) => {
            try {
                client.setex(`${auth}|token|expiry`, exp, JSON.stringify(auth));
                resolve(true);
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
    getUserStateToken(auth) {
        return new Promise((resolve, reject) => {
            try {
                client.get(`${auth}|token|expiry`, (err, data) => {
                    if (err)
                        throw err;
                    if (data !== null) {
                        resolve(data);
                    }
                    else {
                        resolve(null);
                    }
                });
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
    ;
    deleteUserStateToken(auth) {
        return new Promise((resolve, reject) => {
            try {
                client.del(`${auth}|token|expiry`, function (err, response) {
                    resolve(true);
                });
            }
            catch (error) {
                console.log("ERROR IN REDIS");
                reject(error.message);
            }
        });
    }
    ;
    searchData(pattern) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                scanner = new redisScan(client);
                scanner.scan(pattern, (err, matchingKeys) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        reject(err);
                    Promise.all(matchingKeys.map(key => {
                        return new Promise((resolve, reject) => {
                            try {
                                this.getData(`${key}`).then(data => {
                                    data = new Object(data);
                                    if (data !== null) {
                                        console.log(key);
                                        let split = key.split("|");
                                        let type = key.split("|")[split.length - 1];
                                        let id;
                                        if (type == 'user') {
                                            id = key.split("|")[3];
                                        }
                                        else if (type == 'product') {
                                            id = key.split("|")[0];
                                        }
                                        this.getData(`${id}|${type}|analytics|search`).then(analytic => {
                                            console.log(id, type, analytic, data["trend"]);
                                            data["trend"] = analytic !== null ? _.toInteger(analytic) : 0;
                                            resolve(data);
                                        });
                                    }
                                    else {
                                        resolve(null);
                                    }
                                });
                            }
                            catch (error) {
                                reject(error.message);
                            }
                        });
                    })).then(data => {
                        resolve(_.reverse(_.sortBy(data, [function (o) { return o.trend; }])));
                    });
                }));
            }
            catch (error) {
                reject(error.message);
            }
        }));
    }
    setData(data, key, exp = 3600) {
        return new Promise((resolve, reject) => {
            try {
                if (exp == 0) {
                    client.setex(`${key}`, 172800, JSON.stringify(data)); //2 day record
                }
                else {
                    client.setex(`${key}`, exp, JSON.stringify(data));
                }
                resolve(true);
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
    getData(key) {
        return new Promise((resolve, reject) => {
            try {
                client.get(`${key}`, (err, data) => {
                    if (err)
                        throw err;
                    if (data !== null) {
                        resolve(JSON.parse(data));
                    }
                    else {
                        resolve(null);
                    }
                });
            }
            catch (error) {
                reject(error.message);
            }
        });
    }
    ;
    getRedisKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    client.keys("*", (err, keys) => {
                        let count = _.filter(keys, (o) => {
                            return o.split("|")[0] == "count";
                        });
                        if (err)
                            reject({ success: false, message: err });
                        resolve({ count });
                    });
                }
                catch (error) {
                    reject({ success: false, message: error.message });
                }
            });
        });
    }
    ;
    deleteRedisKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    client.flushdb((err, succeeded) => {
                        if (err)
                            reject({ success: false, message: err });
                        resolve({ message: "Keys Deleted", success: true });
                    });
                }
                catch (error) {
                    reject({ success: false, message: error.message });
                }
            });
        });
    }
    ;
    searchAndDeleteKeys(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let key = "*" + keyword + "*";
                    client.keys(key, (err, keys) => {
                        keys.forEach((k) => {
                            client.del(k, (err, response) => {
                                console.log(`${key} keys deleted`);
                                resolve(true);
                            });
                        });
                    });
                }
                catch (error) {
                    reject({ success: false, message: error.message });
                }
            });
        });
    }
    ;
}
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map