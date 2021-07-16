import compose from "composable-middleware"
import { Validator } from "../controller/validate";
import { UserService } from "../services/user.service";

export class ValidationMiddleware extends Validator {
    constructor() {
        super();
    }
    validateUserRegistration() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateRegisterData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(400).send(errors);
                            return;
                        });
                })
        )
    }
    validateUserVerify() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateVerifyData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(400).send(errors);
                            return;
                        });
                })
        )
    }
    validateUserLogin() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateLoginData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(400).send(errors);
                            return;
                        })
                })
        )
    }
    validateUserUpdate() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserUpdateData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(400).send(errors);
                            return;
                        })
                })
        )
    }

    validateAdminUserUpdate() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateAdminUserUpdateData(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(400).send(errors);
                            return;
                        })
                })
        )
    }

   

    validateBlockRequest() {
        return (
            compose()
                .use((req, res, next) => {
                    
                let TokenId = req.user.id;
                let paramsId = req.params.id;
                
                if (TokenId == paramsId){
                    return res.status(409).send({ success: false, msg: "Not Allowed To Perform This Action" });
                } else {
                    next();
                }
            })
        )
    }

    
    validateOrders() {
        return (
            compose().use((req,res,next) => {
                super.validateOrderCreateJoi(req.body)
                    .then(data => {
                        next();
                    }).catch(error => {
                        console.log(error)
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return;
                    })
            })  
        )
    }

    validateIncomingFile() {
        return (
            compose().use((req,res,next) => {

                if (!req.file) {
                    return res.send({
                        success: false,
                        msg: "File Is Required To Perform This Action"
                    })
                } else {
                    next();
                }
    
            })
        )
    }

    validateReturnPolicy() {
        return (
            compose().use((req,res,next) => {

                super.validateReturnPolicyJoi(req.body)
                    .then(data => {
                        next();
                    }).catch(error => {
                        console.log(error)
                        var errors = {
                            success: false,
                            msg: error.details[0].message,
                            data: error.name,
                        };
                        res.status(400).send(errors);
                        return;
                    })
            })
        )
    }

}
