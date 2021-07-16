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
exports.AdminSettings = void 0;
const settings_service_1 = require("../../../../services/settings.service");
const error_service_1 = require("../../../../services/error.service");
class AdminSettings {
    createTerms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let settingsService = new settings_service_1.SettingsService();
                let createupdatetermsandconditions = yield settingsService.createTerms({ termsandconditions: req.body.termsandconditions });
                res.status(200).send({ success: true, data: createupdatetermsandconditions, msg: "AboutUs Successfully Created", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    updateTerms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let settingsService = new settings_service_1.SettingsService();
                let updatetermsandconditions = yield settingsService.updateTerms({ id: req.params.id }, { termsandconditions: req.body.termsandconditions });
                res.status(200).send({ success: true, data: updatetermsandconditions, msg: "AboutUs Successfully Created", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    // About Us
    createAboutus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let settingsService = new settings_service_1.SettingsService();
                let createAboutsUs = yield settingsService.createAboutus({ aboutus: req.body.aboutus });
                res.status(200).send({ success: true, data: createAboutsUs, msg: "AboutUs Successfully Created", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
    updateAboutus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let settingsService = new settings_service_1.SettingsService();
                let createAboutsUs = yield settingsService.updateAboutus({ id: req.params.id }, { aboutus: req.body.aboutus });
                res.status(200).send({ success: true, data: createAboutsUs, msg: "AboutUs Successfully Created", status: 200 });
            }
            catch (error) {
                error_service_1.ErrorService.handler(res, 500, { success: false, msg: error.message, status: 500 });
            }
        });
    }
}
exports.AdminSettings = AdminSettings;
//# sourceMappingURL=settings.admin.controller.js.map