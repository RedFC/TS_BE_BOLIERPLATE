import expess from "express";
import { userRouter } from "../app/http/controller/api/user";
import { blockedRouter } from "../app/http/controller/api/blocked";
import { categoryRouter } from "../app/http/controller/api/category";
import { userAdminRouter } from "../app/http/controller/api/user/admin";
import { AdminsettingsRouter } from "../app/http/controller/api/settings/admin/index";
const app = expess();

app.use("/users", userRouter);
app.use('/blockUser', blockedRouter);
app.use('/category', categoryRouter);


// ADMIN ROUTES

app.use("/admin/settings",AdminsettingsRouter);
app.use("/users/admin", userAdminRouter);

module.exports = app;