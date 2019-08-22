"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = __importStar(require("jsonwebtoken"));
const UserInfoDao_1 = require("../repository/dao/UserInfoDao");
const _moduleTag = "AuthServiceRoutes";
// Define routers
class AuthServiceRoutes {
    constructor() {
        this.register = async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;
                const name = req.body.name;
                const email = req.body.email;
                const phone = req.body.mobile;
                const id = await UserInfoDao_1.register(username, password, name, email, phone);
                return res.json({ success: 1, errorCode: '1', errorMessage: 'success' });
            }
            catch (err) {
                return res.json({ success: 0, errorCode: '0', errorMessage: err });
            }
        };
        this.login = async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;
                const phone = req.body.phone;
                const result = await UserInfoDao_1.login(username, phone, password);
                if (result) {
                    const jwttoken = jwt.sign({
                        data: username
                    }, 'cert', {
                        "algorithm": "HS512",
                        "expiresIn": 604800
                    });
                    return res.json({ success: 1, errorCode: '1', token: jwttoken, errorMessage: 'success' });
                }
                return res.json({ success: 1, errorCode: '2', errorMessage: 'password error' });
            }
            catch (err) {
                return res.json({ success: 0, errorCode: '0', errorMessage: err });
            }
        };
        this.postMessage = async (req, res) => {
            try {
                const token = req.body.token;
                const message = req.body.message;
                debugger;
                const obj = jwt.verify(token, 'cert');
                const result = await UserInfoDao_1.insertMessage(message);
                if (result > 0) {
                    return res.json({ success: 1, errorCode: '1', messageId: result, errorMessage: 'success' });
                }
                return res.json({ success: 1, errorCode: '2', errorMessage: 'password error' });
            }
            catch (err) {
                return res.json({ success: 0, errorCode: '0', errorMessage: err });
            }
        };
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.post("/message", this.postMessage);
    }
}
exports.AuthServiceRoutes = AuthServiceRoutes;
const authServiceRoutes = new AuthServiceRoutes();
authServiceRoutes.init();
// tslint:disable-next-line:no-default-export
exports.authServiceRouter = authServiceRoutes.router;
