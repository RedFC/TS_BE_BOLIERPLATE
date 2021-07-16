"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const validate_1 = require("../controller/validate");
class ValidationMiddleware extends validate_1.Validator {
    constructor() {
        super();
    }
    validateUserRegistration() {
        return (composable_middleware_1.default()
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
        }));
    }
    validateUserVerify() {
        return (composable_middleware_1.default()
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
        }));
    }
    validateUserLogin() {
        return (composable_middleware_1.default()
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
            });
        }));
    }
    validateUserUpdate() {
        return (composable_middleware_1.default()
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
            });
        }));
    }
    validateAdminUserUpdate() {
        return (composable_middleware_1.default()
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
            });
        }));
    }
    validateBlockRequest() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            let TokenId = req.user.id;
            let paramsId = req.params.id;
            if (TokenId == paramsId) {
                return res.status(409).send({ success: false, msg: "Not Allowed To Perform This Action" });
            }
            else {
                next();
            }
        }));
    }
    validateOrders() {
        return (composable_middleware_1.default().use((req, res, next) => {
            super.validateOrderCreateJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                console.log(error);
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
    validateIncomingFile() {
        return (composable_middleware_1.default().use((req, res, next) => {
            if (!req.file) {
                return res.send({
                    success: false,
                    msg: "File Is Required To Perform This Action"
                });
            }
            else {
                next();
            }
        }));
    }
    validateReturnPolicy() {
        return (composable_middleware_1.default().use((req, res, next) => {
            super.validateReturnPolicyJoi(req.body)
                .then(data => {
                next();
            }).catch(error => {
                console.log(error);
                var errors = {
                    success: false,
                    msg: error.details[0].message,
                    data: error.name,
                };
                res.status(400).send(errors);
                return;
            });
        }));
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map