"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("../../modules/moment"));
const user_service_1 = require("../services/user.service");
const redis_service_1 = require("../../cache/redis.service");
var publicKEY = fs_1.default.readFileSync("config/cert/accessToken.pub", "utf8");
class AuthenticationMiddleware extends redis_service_1.RedisService {
    constructor() {
        super();
    }
    isAuthenticated() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (!token)
                return res.status(401).send({
                    success: false,
                    msg: "Access Denied. No token provided.",
                    code: 401,
                });
            // Remove Bearer from string
            token = token.replace(/^Bearer\s+/, "");
            try {
                var i = process.env.ISSUER_NAME;
                var s = process.env.SIGNED_BY_EMAIL;
                var a = process.env.AUDIENCE_SITE;
                var verifyOptions = {
                    issuer: i,
                    subject: s,
                    audience: a,
                    algorithm: ["RS256"],
                };
                let JWTSPLIT = token.split(".");
                var decodedJWTHeader = JSON.parse(Buffer.from(JWTSPLIT[0], "base64").toString());
                if (decodedJWTHeader.alg != "RS256") {
                    res.send({
                        success: false,
                        msg: "Access Denied. Compromised Authorized Token.",
                        status: 401,
                    });
                    return;
                }
                var decoded = jsonwebtoken_1.default.verify(token, publicKEY, verifyOptions);
                req.user = decoded;
                req.auth = token;
                next();
            }
            catch (ex) {
                console.log("exception: " + ex);
                res
                    .status(400)
                    .send({ success: false, msg: "Invalid token.", status: 400 });
            }
        })
            .use(this.isValid())
            .use(this.refreshAuthToken()));
    }
    refreshAuthToken() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            // This middleware will verify if the jwt is not compromised after user logged out
            super.getUserStateToken(req.auth).then(data => {
                if (data == null) {
                    console.log("Compromised Token!");
                    res.status(401).send({
                        success: false,
                        msg: "Access Denied. Compromised Authorized Token.",
                        status: 401,
                    });
                    return;
                }
                else {
                    super.setUserStateToken(req.auth, moment_1.default(moment_1.default().add(48, 'hours')).fromNow_seconds())
                        .then((success) => {
                        if (success) {
                            console.log("Refresh Token Record Updated");
                            next();
                        }
                    })
                        .catch((error) => res.json(error));
                }
            });
        }));
    }
    isValid() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            let myUserService = new user_service_1.UserService();
            myUserService.findOne({ id: req.user.id, blocked: false })
                .then(user => {
                try {
                    if (user == null) {
                        res.status(401).send({
                            success: false,
                            msg: "Your account access has been blocked.",
                            status: 401,
                        });
                        throw true;
                    }
                    else {
                        next();
                    }
                }
                catch (ex) {
                    this.expireAuthToken(req.auth, 10)
                        .then(raw => { });
                }
            });
        }));
    }
    expireAuthToken(auth, exp) {
        return new Promise((resolve, reject) => {
            super.setUserStateToken(auth, moment_1.default(moment_1.default().add(exp, 'seconds')).fromNow_seconds())
                .then((success) => {
                if (success) {
                    console.log(`Refresh Token record updated and expiring in ${exp} seconds`);
                    resolve(true);
                }
            })
                .catch((error) => reject(error));
        });
    }
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=auth.js.map