"use strict";

import { IUser, Role } from "../models/user.model";
import * as Joi from "joi";

interface UserRegister extends IUser {
    email: string;
    password: string;
    phoneNo: number;
    name: string
    gcm_id: string[],
    platform: string,
}
interface UserLogin extends IUser {
    email: string;
    password: string;
    role: Role;
    gcm_id: string[],
    platform: string,
}
interface UserSocialLogin extends IUser {
    token: string;
    gcm_id: string[];
    platform: string;
}

interface UserUpdate extends IUser {
    username: string;
    name: string;
    about: string;
}

export class Validator {
    constructor() { }

    //************************ VALIDATE USER REGISTER DATA ***********************//
    validateRegisterData(data: UserRegister) {
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
    validateVerifyData(data: UserRegister) {
        const schema = Joi.object().keys({
            phoneNo: Joi.number().required(),
            code: Joi.number().required(),
            gcm_id: Joi.string(),
            platform: Joi.string(),
        });
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE USER LOGIN DATA ***********************//
    validateLoginData(data: UserLogin) {
        const schema = Joi.object().keys({
            username: Joi.string(),
            phoneNo: Joi.string(),
            role: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }
    //************************ VALIDATE USER UPDATE DATA ***********************//
    validateUserUpdateData(data: UserUpdate) {
        const schema = Joi.object().keys({
            username: Joi.string(),
            name: Joi.string(),
            about: Joi.string(),
        });
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE ADMIN USER UPDATE DATA ***********************//
    validateAdminUserUpdateData(data: UserUpdate) {
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
            tags : Joi.array().items(Joi.string().required().label("At least One Tag Is Required")).required()
        })
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE Comment CREATE ***********************//

    validateCommentJoi(data) {
        const schema = Joi.object().keys({
            comment: Joi.string().required(),
            review: Joi.string().required(),
        })
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE Comment Update ***********************//

    validateCommentUpdateJoi(data) {
        const schema = Joi.object().keys({
            comment: Joi.string(),
            review: Joi.string()
        })
        return Joi.validate(data, schema);
    }

    //************************ VALIDATE Orders Create ***********************//
    
    validateOrderCreateJoi(data) {
        const schema = Joi.object().keys({
            fullname: Joi.string().required(),
            email: Joi.string().required(),
            number:Joi.string().required(),
            shippingAddress:Joi.string().required(),
            product:Joi.array().items(Joi.object().keys({id : Joi.string().required()})).required()
        })
        return Joi.validate(data, schema);
    }


    //************************ VALIDATE Return Policy ***********************//

    validateReturnPolicyJoi(data) {
        const schema = Joi.object().keys({
            returnpolicy: Joi.string().required(),
        })
        return Joi.validate(data, schema);
    }

}
