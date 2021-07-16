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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const _ = __importStar(require("lodash"));
const fs = __importStar(require("fs"));
const moment_1 = __importDefault(require("../../../../modules/moment"));
const user_service_1 = require("../../../services/user.service");
const redis_service_1 = require("../../../../cache/redis.service");
const auth_service_1 = require("../../../services/auth.service");
const profile_user_model_1 = require("../../../models/profile.user.model");
const error_service_1 = require("../../../services/error.service");
const short_uuid_1 = __importDefault(require("short-uuid"));
const user_model_1 = require("../../../models/user.model");
const cloudinary_1 = require("../../../../constants/cloudinary");
class User extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    register(req, res) {
        try {
            let _profile = {
                username: req.body.username.toString(),
                name: req.body.name,
                phoneNo: req.body.phoneNo,
            };
            delete req.body.username;
            delete req.body.phoneNo;
            delete req.body.name;
            let user = req.body;
            const myValidateProfile = new profile_user_model_1.ValidateProfile();
            myValidateProfile.validate(_profile, {
                error: message => error_service_1.ErrorService.handler(res, 400, { success: false, msg: message, status: 400 }),
                next: (profile) => __awaiter(this, void 0, void 0, function* () {
                    user.profile = { create: profile };
                    const myUserService = new user_service_1.UserService();
                    if (req.query.test == null) {
                        let smsSent = yield myUserService.sendCode(profile.phoneNo).catch((error) => {
                            error_service_1.ErrorService.handler(res, 500, { success: false, msg: "There was an error in verifying SMS code", raw: error.message, status: 500 });
                        });
                    }
                    let data = yield myUserService.create(user, profile);
                    res.status(200).send({ success: true, user: data, msg: "Verification code sent to your phone number", status: 200 });
                })
            });
        }
        catch (error) {
            error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
        }
    }
    social_register(req, res) {
        let _profile = {
            username: req.body.username != null ? req.body.username : `user-${short_uuid_1.default.generate()}`,
            name: req.body.name,
            phoneNo: req.body.phoneNo,
            profileImage: req.body.profileImage
        };
        delete req.body.username;
        delete req.body.phoneNo;
        delete req.body.profileImage;
        delete req.body.name;
        const myUserService = new user_model_1.ValidateUser();
        myUserService.validate(req.body, {
            error: message => error_service_1.ErrorService.handler(res, 400, { success: false, msg: message, status: 400 }),
            next: (user) => {
                const myValidateProfile = new profile_user_model_1.ValidateProfile();
                myValidateProfile.validate(_profile, {
                    error: message => error_service_1.ErrorService.handler(res, 400, { success: false, msg: message, status: 400 }),
                    next: (profile) => __awaiter(this, void 0, void 0, function* () {
                        user.profile = { create: profile };
                        const myUserService = new user_service_1.UserService();
                        let data = yield myUserService.create(user, profile);
                        myUserService.sendCode(profile.phoneNo)
                            .then(message => {
                            // NEED TO DO PHONE NUMBER VERIFY HERE
                            res.status(200).send({ success: true, user: data, msg: "Verification code sent to your phone number", status: 200 });
                        }).catch((error) => {
                            error_service_1.ErrorService.handler(res, 500, { success: false, msg: "There was an error in verifying SMS code", raw: error.message, status: 500 });
                        });
                    })
                });
            }
        });
    }
    verify(req, res) {
        try {
            let { phoneNo, code, gcm_id, platform } = req.body;
            let myUserService = new user_service_1.UserService();
            myUserService.checkCode(phoneNo, code)
                .then(user => {
                let userValidationService = new user_model_1.ValidateUser();
                userValidationService.validateGCM(user, gcm_id, {
                    error: message => error_service_1.ErrorService.handler(res, 400, { success: false, msg: message, status: 400 }),
                    next: uniqueGCM => {
                        let myAuthService = new auth_service_1.AuthService();
                        myAuthService.generateAuthToken({ id: user.id, role: user.role }, (token) => __awaiter(this, void 0, void 0, function* () {
                            myUserService.redisSetUserData(token, moment_1.default(moment_1.default().add(48, "hours")).fromNow_seconds());
                            if (!uniqueGCM) {
                                let _user = yield myUserService.findOneAndUpdate({ id: user.id }, { gcm: { create: [{ id: gcm_id, platform }] } });
                                myUserService.redisUpdateUser(_user);
                                _user["access_token"] = token;
                                let success = {
                                    success: true,
                                    msg: "Logged in successfully",
                                    user: _user,
                                };
                                res.status(200).send(success);
                                return;
                            }
                            else {
                                let _user = _.clone(user);
                                myUserService.redisUpdateUser(_user);
                                _user["access_token"] = token;
                                let success = {
                                    success: true,
                                    msg: "Logged in successfully",
                                    user: _user,
                                };
                                res.status(200).send(success);
                                return;
                            }
                        }));
                    }
                });
            }).catch(error => {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: "There was an error in verifying SMS code", raw: error.message, status: 500 });
            });
        }
        catch (error) {
            error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
        }
    }
    login(req, res) {
        try {
            let { username, phoneNo, role } = req.body;
            let orQuery = [];
            if (username != null && username != "" && username != undefined)
                orQuery.push({ profile: { username } });
            if (phoneNo != null && phoneNo != "" && phoneNo != undefined)
                orQuery.push({ profile: { phoneNo } });
            let myUserService = new user_service_1.UserService();
            myUserService.findOneAdmin({
                blocked: false, role, OR: orQuery
            })
                .then(user => {
                if (!user) {
                    error_service_1.ErrorService.handler(res, 400, {
                        success: false,
                        msg: "No user with this account exists!",
                        status: 400
                    });
                }
                else {
                    // NEED TO DO PHONE NUMBER VERIFY HERE
                    myUserService.sendCode(user.profile.phoneNo)
                        .then(message => {
                        res.status(200).send({ success: true, user, msg: "Verification code sent to your phone number", status: 200 });
                    }).catch((error) => {
                        error_service_1.ErrorService.handler(res, 500, { success: false, msg: "There was an error in verifying SMS code", raw: error.message, status: 500 });
                    });
                }
            }).catch(error => error_service_1.ErrorService.handler(res, 400, error));
        }
        catch (error) {
            error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
        }
    }
    logout(req, res) {
        const _super = Object.create(null, {
            deleteUserStateToken: { get: () => super.deleteUserStateToken }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let success = yield _super.deleteUserStateToken.call(this, req.auth);
                if (success) {
                    let myUserService = new user_service_1.UserService();
                    myUserService.findOneAndUpdate({ id: req.user.id }, { gcm: { deleteMany: [{ id: req.body.gcm_id }] }, }).then((_user) => {
                        myUserService.redisUpdateUser(_user);
                        var success = {
                            success: true,
                            msg: "Logged out successfully",
                        };
                        res.status(200).send(success);
                    }).catch((error) => {
                        res
                            .status(500)
                            .send({ success: false, msg: error.message });
                        return;
                    });
                }
                return;
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let limit = _.toInteger(req.query.limit);
                let page = _.toInteger(req.query.page);
                let { key, id } = req.query;
                let myUserService = new user_service_1.UserService();
                if (id != null && id != "" && id != undefined) {
                    let user = yield myUserService.findOne({ id });
                    myUserService.redisUpdateUser(user);
                    res.send({
                        success: true, user: user.profile
                    });
                }
                else {
                    let orQuery = [
                        { email: { contains: key, mode: "insensitive", } },
                        { profile: { username: { contains: key, mode: "insensitive", } } },
                        { profile: { name: { contains: key, mode: "insensitive", } } }
                    ];
                    let { users, count } = yield myUserService.findWithLimit({ blocked: false, role: "USER", OR: orQuery }, limit, page);
                    let user_profiles = users.map(x => x.profile);
                    users.map(user => myUserService.redisUpdateUser(user));
                    res.send({
                        success: true, users: user_profiles,
                        page: page,
                        pages: Math.ceil(count / limit),
                        count
                    });
                }
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, name, about } = JSON.parse(JSON.stringify(req.body));
                const files = JSON.parse(JSON.stringify(req.files));
                console.log(username, name, about);
                let user = {
                    profile: {
                        update: {
                            username,
                            name,
                            about,
                        }
                    }
                };
                if (files.image != null) {
                    const file = files.image;
                    const image = (path) => __awaiter(this, void 0, void 0, function* () {
                        const cloudinary = new cloudinary_1.Cloudinary();
                        return yield cloudinary.uploads(path, "image");
                    });
                    const { path } = file[0];
                    const imgURL = yield image(path);
                    fs.unlink(path, () => { console.log(`Deleted ${path}`); });
                    user.profile.update["profileImage"] = imgURL.url;
                }
                const myUserService = new user_service_1.UserService();
                let updatedUser = yield myUserService.findOneAndUpdate({ id: req.user.id }, user);
                myUserService.redisUpdateUser(updatedUser);
                res.send({
                    success: true, user: updatedUser, msg: "User updated successfully"
                });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    createReturnPolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const myUserService = new user_service_1.UserService();
                let _schema = {
                    returnpolicy: req.body.returnpolicy,
                    user: { connect: { id: req.user.id } }
                };
                let createReturnPolicies = yield myUserService.CreateReturnPolicies(req.user.id, _schema.returnpolicy, _schema.user);
                res.status(200).send({ success: true, data: createReturnPolicies, msg: "Updated Your Return Policies", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.controller.js.map