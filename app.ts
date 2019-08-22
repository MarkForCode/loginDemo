import * as bodyParser from "body-parser";
import express from "express";
import { AuthServiceRoutes, authServiceRouter } from "./routes/AuthServiceRoutes";

const _moduleTag = "internalApiRouter";
// Creates and configures an ExpressJS web server.
class App {
    public express: express.Application;

    /**
     * Configure Express middleware.
     */
    constructor() {
        // -->Init: routes
        this.express = express();
        this.middleware();
        this.routes();

        // todo: prepare your db here
    }
    private middleware(): void {
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
    private routes(): void {
        this.express.use("/hello", (req, res) => {res.json('hello')});
        this.express.use("/user", authServiceRouter);

    }
}

// tslint:disable-next-line:no-default-export
export default new App().express;
