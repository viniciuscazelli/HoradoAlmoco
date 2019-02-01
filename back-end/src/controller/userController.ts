import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { messageReturn } from "../models/messageReturn";
import { authController } from "./authController";

export module userController {

    export function saveUser(req, res){
        let  u : user = req.body;
        userCase.saveUser(u).then((value:messageReturn) => {
            if(value.code == 200)
                this.authUser(req,res);
            else{
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = value.code;
                res.send(JSON.stringify(value));
            }
        });
    }

    export function authUser(req, res){
        let  u : user = req.body;
        
        userCase.authUser(u).then((value:messageReturn) => {
            if(value.code == 200)
            {
                authController.setAuth(req,value.res);
            }else{
                authController.setAuth(req,undefined);
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = value.code;
            res.send(JSON.stringify(value));
        })
    }

    export function logout(req, res){
        authController.removeAuth(req, res);
    }
    
}