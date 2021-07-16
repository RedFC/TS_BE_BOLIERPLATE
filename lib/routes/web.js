"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../app/http/controller/web/error");
const resources_1 = require("../app/http/controller/web/resources");
const verification_1 = require("../app/http/controller/web/verification");
const views_1 = require("../app/http/controller/web/views");
module.exports = function (app) {
    app.use("/error", error_1.errorRouter);
    app.use("/resources", resources_1.resourceRouter);
    app.use("/verification", verification_1.verificationRouter);
    app.use("/", views_1.viewsRouter);
};
//# sourceMappingURL=web.js.map