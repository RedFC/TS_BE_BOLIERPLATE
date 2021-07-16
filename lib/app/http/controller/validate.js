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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const Joi = __importStar(require("joi"));
class Validator {
    constructor() { }
    //************************ VALIDATE USER REGISTER DATA ***********************//
    validateRegisterData(data) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number().required(),
            username: Joi.string(),
            name: Joi.string(),
            profileImage: Joi.string(),
            email: Joi.string().email({ minDomainAtoms: 2 }),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER VERIFY DATA ***********************//
    validateVerifyData(data) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number().required(),
            code: Joi.number().required(),
            gcm_id: Joi.string(),
            platform: Joi.string(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER LOGIN DATA ***********************//
    validateLoginData(data) {
        const schema = Joi.object().keys({
            username: Joi.string(),
            phoneNo: Joi.string(),
            role: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER UPDATE DATA ***********************//
    validateUserUpdateData(data) {
        const schema = Joi.object().keys({
            username: Joi.string(),
            name: Joi.string(),
            about: Joi.string(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE ADMIN USER UPDATE DATA ***********************//
    validateAdminUserUpdateData(data) {
        const schema = Joi.object().keys({
            email: Joi.string(),
            id: Joi.string().required(),
            blocked: Joi.boolean(),
            username: Joi.string(),
            name: Joi.string(),
            about: Joi.string(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Rating & Reviews CREATE ***********************//
    validateReatingAndReviews(data) {
        const schema = Joi.object().keys({
            stars: Joi.number().min(0).max(5).required(),
            message: Joi.string().required(),
            title: Joi.string().required(),
            thumbnail: Joi.string().required(),
            tags: Joi.array().items(Joi.string().required().label("At least One Tag Is Required")).required()
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Comment CREATE ***********************//
    validateCommentJoi(data) {
        const schema = Joi.object().keys({
            comment: Joi.string().required(),
            review: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Comment Update ***********************//
    validateCommentUpdateJoi(data) {
        const schema = Joi.object().keys({
            comment: Joi.string(),
            review: Joi.string()
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Orders Create ***********************//
    validateOrderCreateJoi(data) {
        const schema = Joi.object().keys({
            fullname: Joi.string().required(),
            email: Joi.string().required(),
            number: Joi.string().required(),
            shippingAddress: Joi.string().required(),
            product: Joi.array().items(Joi.object().keys({ id: Joi.string().required() })).required()
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE Return Policy ***********************//
    validateReturnPolicyJoi(data) {
        const schema = Joi.object().keys({
            returnpolicy: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validate.js.map