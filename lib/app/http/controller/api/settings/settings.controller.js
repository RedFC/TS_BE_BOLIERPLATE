"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const settings_service_1 = require("../../../services/settings.service");
const error_service_1 = require("../../../services/error.service");
class Settings {
    getTerms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let service = new settings_service_1.SettingsService();
                let getTerms = yield service.getTerms();
                res.status(200).send({ success: true, data: getTerms, msg: "Fetched Successfull", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    getAboutus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let service = new settings_service_1.SettingsService();
                let getAbout = yield service.getAboutus();
                res.status(200).send({ success: true, data: getAbout, msg: "Fetched Successfully", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    getReturnPolicy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let service = new settings_service_1.SettingsService();
                let getReturnpolicy = yield service.getReturnPolicy();
                res.status(200).send({ success: true, data: getReturnpolicy, msg: "Fetched Successfully", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.controller.js.map