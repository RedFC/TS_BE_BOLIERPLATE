"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const auth_1 = require("../http/middleware/auth");
const role_1 = require("../http/middleware/role");
const cache_controller_1 = require("./cache.controller");
let role_controller = new role_1.RoleMiddleware();
let redis_controller = new cache_controller_1.Redis();
let auth_controller = new auth_1.AuthenticationMiddleware();
router.get('/keys/get', auth_controller.isAuthenticated(), redis_controller.getKeys);
router.delete('/keys/delete', auth_controller.isAuthenticated(), role_controller.isAdmin(), redis_controller.flushdb);
router.delete('/keys/delete/auth', auth_controller.isAuthenticated(), role_controller.isAdmin(), redis_controller.flushAuth);
module.exports = router;
//# sourceMappingURL=index.js.map