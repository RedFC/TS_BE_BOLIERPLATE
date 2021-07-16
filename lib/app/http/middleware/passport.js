"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const axios_1 = __importDefault(require("axios"));
const passport_facebook_1 = require("passport-facebook");
const passport_google_oauth_1 = require("passport-google-oauth");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../services/user.service");
passport_1.default.use(new passport_google_oauth_1.OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: config_1.default.get("g-callback")
}, function (accessToken, refreshToken, profile, done) {
    const myUserService = new user_service_1.UserService();
    myUserService.findOne({ email: profile._json.email })
        .then(user => {
        let data;
        if (!user) {
            // CREATE NEW USER 
            data = {
                existing: false,
                user: {
                    email: profile._json.email,
                    profile: {
                        name: profile._json.name,
                        profileImage: profile._json.picture,
                        phoneNo: null
                    }
                },
                next: `${config_1.default.get("origin")}/social/register`
            };
        }
        else {
            data = {
                existing: true,
                user,
                next: `${config_1.default.get("origin")}/api/users/verify`
            };
        }
        return done(null, data);
    });
}));
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: config_1.default.get("fb-callback")
}, function (accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken);
    let requestData;
    axios_1.default.get(`https://graph.facebook.com/v10.0/me?fields=id%2Cname%2Cemail%2Cpicture.type(large)&access_token=${accessToken}`)
        .then(function (profile) {
        profile = profile.data;
        const myUserService = new user_service_1.UserService();
        myUserService.findOne({ email: profile.email })
            .then(user => {
            let data;
            if (!user) {
                // CREATE NEW USER 
                data = {
                    existing: false,
                    user: {
                        email: profile.email,
                        profile: {
                            name: profile.name,
                            profileImage: profile.picture.data.url,
                            phoneNo: null
                        }
                    },
                    next: `${config_1.default.get("origin")}/social/register`
                };
            }
            else {
                data = {
                    existing: true,
                    user,
                    next: `${config_1.default.get("origin")}/api/users/verify`
                };
            }
            return done(null, data);
        });
    });
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map