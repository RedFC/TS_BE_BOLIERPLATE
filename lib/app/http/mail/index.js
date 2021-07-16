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
exports.MailSender = void 0;
const defaults = __importStar(require("../../../config/default.json"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../services/user.service");
class MailSender {
    constructor(user, token) {
        this.user = user;
        this.token = token;
        this.transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    sendUserVerifyEmail() {
        var mailOptions = {
            to: this.user.email,
            from: process.env.NODEMAILER_USER,
            subject: "Email Verification",
            text: "You are receiving this because you have requested email verification for your account.\n" +
                "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                config_1.default.get("origin") +
                "/verification/email/" +
                this.token +
                "\n\n" +
                "If you did not request this, please ignore this email if you did not create an account.\n" +
                "\n\n" +
                "This link will expire in " +
                defaults.ACCESS_TOKEN.EXPIRE_NUM +
                defaults.ACCESS_TOKEN.EXPIRE_VALUE,
        };
        return new Promise((resolve, reject) => {
            try {
                this.transporter.sendMail(mailOptions, (err, info) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        reject({ msg: err, status: 502, success: false });
                        return;
                    }
                    let user_service_obj = new user_service_1.UserService();
                    user_service_obj
                        .findOneAndUpdate({ _id: this.user.id, email: this.user.email }, { isEmailVerified: false })
                        .then((result) => {
                        var data = {
                            success: true,
                            id: this.user.id,
                            msg: "Please check your email for account verification!",
                            status: 200,
                        };
                        resolve(data);
                        return;
                    })
                        .catch((error) => {
                        if (error) {
                            reject({ success: false, msg: error, status: 409 });
                            return;
                        }
                    });
                }));
            }
            catch (e) {
                reject({ success: false, msg: e.message, status: 500 });
                return;
            }
        });
    }
}
exports.MailSender = MailSender;
//# sourceMappingURL=index.js.map