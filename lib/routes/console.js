"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const appRoot = __importStar(require("app-root-path"));
const config = require('config');
const path = require("path");
app.get("/health", function (req, res) {
    console.log({
        origin: config.get('origin'),
        environment: process.env.NODE_ENV,
        port: process.env.PORT,
        sql_db: process.env.DATABASE_URL,
        m_db_cluster: process.env.MONGO_CLUSTER,
        m_db_name: config.get('db.name'),
        r_host: process.env.REDIS_HOST,
        r_port: process.env.REDIS_PORT
    });
    res.json({
        success: true,
    });
});
app.get("/logs", function (req, res) {
    let filePath = ".." + "\\" + "access.log";
    console.log();
    res.sendFile(path.join(appRoot.path, 'access.log'));
});
module.exports = app;
//# sourceMappingURL=console.js.map