"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
var privateKEY = fs_1.default.readFileSync('config/cert/accessToken.pem', 'utf8');
class AuthService {
    generateAuthToken({ id, role }, callback) {
        var i = process.env.ISSUER_NAME;
        var s = process.env.SIGNED_BY_EMAIL;
        var a = process.env.AUDIENCE_SITE;
        var signOptions = {
            issuer: i,
            subject: s,
            audience: a,
            algorithm: "RS256",
        };
        var payload = {
            id,
            role
        };
        var token = jsonwebtoken_1.default.sign(payload, privateKEY, signOptions);
        return callback(token);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map