'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
class ErrorService {
    static handler(res, status, data) {
        console.error(data);
        return res.status(status).send(data);
    }
}
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.service.js.map