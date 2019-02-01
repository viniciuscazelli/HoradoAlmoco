import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { systemOptions } from "../models/systemOptions";
import { authController } from "./authController";
import { systemOptionsCase } from "../use-cases/systemOptionsCase";

export module systemOptionsController {

    export function saveSystemOptions(req, res){
        let  s : systemOptions = req.body;
        if(authController.isAuthenticated(req,res)){
            if(authController.getUserAuthenticated(req).name == "admin"){
                systemOptionsCase.saveSystemOptions(s).then((value:messageReturn) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = value.code;
                    res.send(JSON.stringify(value));
                });
            }else{
                var r : messageReturn  = new messageReturn(null,"Usuário sem permissão",403);
                res.statusCode = r.code;
                res.send(JSON.stringify(r));
            }
        }
    }

    export function getSystemOptions(req, res){
       
        systemOptionsCase.getSystemOptions().then(value=>{
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = value.code;
            res.send(JSON.stringify(value));
        })
        
    }
}