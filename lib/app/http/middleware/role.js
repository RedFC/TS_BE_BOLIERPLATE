"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
class RoleMiddleware {
    isAdmin() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            if (req.user.role == 'ADMIN') {
                next();
            }
            else {
                res.status(401).send({ success: false, msg: "Insufficient privileges." });
                return;
            }
        }));
    }
    isUser() {
        return (composable_middleware_1.default()
            // Attach user to request
            .use((req, res, next) => {
            if (req.user.role == 'USER' || req.user.role == 'ADMIN') {
                next();
            }
            else {
                res.status(401).send({ success: false, msg: "Insufficient privileges." });
                return;
            }
        }));
    }
}
exports.RoleMiddleware = RoleMiddleware;
//# sourceMappingURL=role.js.map