import { authController } from "./authController";
import { reserveCase } from "../use-cases/reserveCase";
import { Day, ReserveDay, Horary } from "../models/Day";
import { user } from "../models/user";


export module reserveController {

    export function removeReserve(req, res, callback ){
        if(authController.isAuthenticated(req,res,false)){
            var d: ReserveDay = req.body;
            var u: user = req.session.userLogged

            reserveCase.removeReserve(d,u).then(value =>{
                callback(value);
            })
        }
    }

    export function saveReserve(req, res, callback ){
        
        if(authController.isAuthenticated(req,res,false)){

            var d: ReserveDay = req.body;
            var u: user = req.session.userLogged
            
            reserveCase.saveReserve(d,u).then(v =>{
                callback(v);
            })
        }
                
            
    }
    
    
}