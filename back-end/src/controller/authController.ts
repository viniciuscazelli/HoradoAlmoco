import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";

export module authController {

    export function isAuthenticated(req, res, sendresponse:boolean = false):boolean{
        

        var m: messageReturn;
        
        if(req.session.userLogged == undefined || req.session.userLogged == null ){
            m = new messageReturn(undefined,"Autorização negada", 401);
            req.session.userLogged = undefined;
        }

        if(req.session.userLogged != undefined && req.session.userLogged != null && sendresponse)
            m = new messageReturn(req.session.userLogged ,"Autorizado", 200);
    
        res.statusCode = m.code;
        res.send(JSON.stringify(m));

        return req.session.userLogged != undefined && req.session.userLogged != null;
    }

    export function setAuth(req: any,user:user){
       // console.log(req.session);
        req.session.userLogged = user;
       
    }

    export function removeAuth(req, res){
        var m: messageReturn;
        m = new messageReturn(undefined,"Sucesso!", 200);
        req.session.destroy();
        res.send(JSON.stringify(m));
        
     }
}