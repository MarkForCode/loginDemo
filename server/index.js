"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const app_1 = __importDefault(require("./app"));
const _moduleTag = "index";
// -->Set: port
const port = normalizePort(process.argv[3] || "8821");
app_1.default.set("port", port);
// -->Set: headers
/*
App.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
*/
const server = http.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    // tslint:disable-next-line:no-shadowed-variable
    let port = (typeof val === "string") ? parseInt(val, 10) : val;
    if (isNaN(port)) {
        return val;
    }
    else if (port >= 0) {
        return port;
    }
    else {
        return false;
    }
}
function onError(error) {
    const _funTag = _moduleTag + "_Push";
    if (error.syscall !== "listen") {
        throw error;
    }
    let bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            // logger.error(_funTag, `${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            // logger.error(_funTag, `${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    //let addr = server.address();
    //let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
}
