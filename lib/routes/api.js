"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../app/http/controller/api/user");
const blocked_1 = require("../app/http/controller/api/blocked");
const category_1 = require("../app/http/controller/api/category");
const admin_1 = require("../app/http/controller/api/user/admin");
const index_1 = require("../app/http/controller/api/settings/admin/index");
const app = express_1.default();
app.use("/users", user_1.userRouter);
app.use('/blockUser', blocked_1.blockedRouter);
app.use('/category', category_1.categoryRouter);
// ADMIN ROUTES
app.use("/admin/settings", index_1.AdminsettingsRouter);
app.use("/users/admin", admin_1.userAdminRouter);
module.exports = app;
//# sourceMappingURL=api.js.map