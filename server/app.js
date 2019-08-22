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
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const AuthServiceRoutes_1 = require("./routes/AuthServiceRoutes");
const _moduleTag = "internalApiRouter";
// Creates and configures an ExpressJS web server.
class App {
    /**
     * Configure Express middleware.
     */
    constructor() {
        // -->Init: routes
        this.express = express_1.default();
        this.middleware();
        this.routes();
        // todo: prepare your db here
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.text());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // if (GetEnv() !== "dev") { this.express.use(decodeJWT); }
        // this.express.use(decodeJWT);
    }
    /**
     * Load all API endpoints
     *      -- create route endpoints here
     *      -- check the sample
     */
    routes() {
        this.express.use("/hello", (req, res) => { res.json('hello'); });
        this.express.use("/user", AuthServiceRoutes_1.authServiceRouter);
    }
}
// tslint:disable-next-line:no-default-export
exports.default = new App().express;
