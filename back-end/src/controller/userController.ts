import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { messageReturn } from "../models/messageReturn";
import { authController } from "./authController";
import { systemOptionsCase } from "../use-cases/systemOptionsCase";
import { systemOptions } from "../models/systemOptions";

export module userController {

    export function saveUser(req, res){
        let  u : user = req.body;

        systemOptionsCase.getSystemOptions().then(r => {
            var systemOptions:systemOptions = r.res;
            if(systemOptions.activeSignup && u.name.endsWith(systemOptions.prefix)){

                userCase.saveUser(u).then((value:messageReturn<user>) => {
                    if(value.code == 200)
                        this.authUser(req,res);
                    else{
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = value.code;
                        res.send(JSON.stringify(value));
                    }
                });
            }else{
                var response : messageReturn<user>  = new messageReturn<user>(null,"Não foi possivel realizar o cadastro",400);
                res.statusCode = r.code;
                res.send(JSON.stringify(response));
            }
        })
    }

    export function authUser(req, res){
        let  u : user = req.body;
        userCase.authUser(u).then((value:messageReturn<user>) => {
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