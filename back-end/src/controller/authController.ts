import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";

export module authController {

    export function isAuthenticated(req, res, sendresponse:boolean):boolean{
        
        var m: messageReturn<user>  ;
        
        if(req.session == undefined || req.session.userLogged == undefined || req.session.userLogged == null ){
            m = new messageReturn<user>(undefined,"Autorização negada", 401);
            req.session.userLogged = undefined;
            res.statusCode = m.code;
            res.send(JSON.stringify(m));
        }

        if(req.session.userLogged != undefined && req.session.userLogged != null && sendresponse){
            m = new messageReturn<user>(req.session.userLogged ,"Autorizado", 200);
            res.statusCode = m.code;
            res.send(JSON.stringify(m));
        }

        return req.session.userLogged != undefined && req.session.userLogged != null;
    }

    export function isAuthenticatedBySession(session):boolean{
        return session.userLogged != undefined && session.userLogged != null;
    }

    export function setAuth(req: any,user:user){
        req.session.userLogged = user;
    }

    export function getUserAuthenticated(req: any):user{
         return req.session.userLogged ;
     }

    export function removeAuth(req, res){
        var m: messageReturn<user>;
        m = new messageReturn(undefined,"Sucesso!", 200);
        req.session.destroy();
        res.send(JSON.stringify(m));
        
     }
}