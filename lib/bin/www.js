#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
require('dotenv').config();
var app = require("../app");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const http_1 = __importDefault(require("http"));
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const redis_service_1 = require("../app/cache/redis.service");
let redis = new redis_service_1.RedisService();
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    connectDatabase();
    connectRedis();
    console.info(`✔️ Server Started (listening on PORT : ${port})`);
    console.info(`⌚`, moment_1.default().format("DD-MM-YYYY hh:mm:ss a"));
});
// run inside `async` function
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            prisma.$disconnect();
            console.info(`✔️ Database Safely Connected with (${process.env.DATABASE_URL})`);
        }
        catch (err) {
            console.info(`⌚`, moment_1.default().format("DD-MM-YYYY hh:mm:ss a"));
            console.error("❗️ Could not connect to database...", err);
            server.close();
            process.exit();
        }
    });
}
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield redis.connect_cache();
            console.info("✔️ Redis Cache Connected");
        }
        catch (err) {
            console.info(`⌚`, moment_1.default().format("DD-MM-YYYY hh:mm:ss a"));
            console.error("❗️ Could not connect to database...", err);
            server.close();
            process.exit();
        }
    });
}
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function terminate(server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };
    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            fs_1.default.appendFileSync("access.log", err.message);
            console.log(err.message, err.stack);
        }
        // Attempt a graceful shutdown
        // server.close(exit);
        // setTimeout(exit, options.timeout).unref();
    };
}
function exitHandler(options, exitCode) {
    terminate(server, {
        coredump: false,
        timeout: 500,
    });
    console.log('⚠️ Gracefully shutting down');
    server.close();
    process.exit();
}
process.on("uncaughtException", (err) => {
    fs_1.default.appendFile("access.log", `Uncaught Exception: ${err.message}`, () => { });
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason, promise) => {
    fs_1.default.appendFile("access.log", `Unhandled rejection, reason: ${reason}`, () => { });
    console.log("Unhandled rejection at", promise, `reason: ${reason}`);
});
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
//# sourceMappingURL=www.js.map