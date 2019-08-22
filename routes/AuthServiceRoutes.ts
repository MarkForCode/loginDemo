import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import * as _ from 'lodash';
import { register, login, insertMessage } from "../repository/dao/UserInfoDao";

const _moduleTag = "AuthServiceRoutes";
// Define routers
export class AuthServiceRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.post("/message", this.postMessage);
    }

    private register = async (req: Request, res: Response) => {
        try{
            const username = req.body.username;
            const password = req.body.password;
            const name = req.body.name;
            const email = req.body.email;
            const phone = req.body.mobile;
            
            const id = await register(username, password, name, email, phone);
            return res.json({success: 1, errorCode: '1', errorMessage:'success'});
        }catch(err){
            return res.json({success: 0, errorCode: '0', errorMessage: err});
        }
        
    }


    private login = async (req: Request, res: Response) => {
        try{
            const username = req.body.username;
            const password = req.body.password;
            const phone = req.body.phone;
            const result = await login(username, phone, password);
            if(result) {
                const jwttoken =  jwt.sign({
                    data: username
                    }
                    , 'cert'
                    , {
                        "algorithm" : "HS512"
                        , "expiresIn" : 604800
                    });
                return res.json({success: 1, errorCode: '1', token: jwttoken, errorMessage:'success'});
            }
            return res.json({success: 1, errorCode: '2', errorMessage:'password error'});
        }catch(err){
            return res.json({success: 0, errorCode: '0', errorMessage: err});
        }
    }


    private postMessage = async (req: Request, res: Response) => {
        try{
            const token = req.body.token;
            const message = req.body.message;
            debugger;
            const obj = jwt.verify(token, 'cert');
            const result = await insertMessage(message);
            if(result > 0) {
                return res.json({success: 1, errorCode: '1', messageId: result , errorMessage:'success'});
            }
            return res.json({success: 1, errorCode: '2', errorMessage:'password error'});
        }catch(err){
            return res.json({success: 0, errorCode: '0', errorMessage: err});
        }
    }
}


const authServiceRoutes = new AuthServiceRoutes();
authServiceRoutes.init();
// tslint:disable-next-line:no-default-export
export let authServiceRouter: Router = authServiceRoutes.router;
