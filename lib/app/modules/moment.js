"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
moment_1.default.fn.fromNow_seconds = function (a) {
    var duration = moment_1.default(this).diff(moment_1.default(), 'seconds');
    return duration;
};
moment_1.default.fn.olderThan13 = function (a) {
    var duration = moment_1.default.duration(moment_1.default(new Date()).diff(moment_1.default(this)));
    if (duration.asYears() <= 13) {
        return false;
    }
    else {
        return true;
    }
};
exports.default = moment_1.default;
//# sourceMappingURL=moment.js.map