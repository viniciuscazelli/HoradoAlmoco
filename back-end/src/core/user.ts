import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { MongoClient } from "mongodb";
import {UserRepository} from "../db/user";
import { sha512 } from "js-sha512"

export module userController {

    export function saveUser(user : user, callback) : void{
        (async () => {
            const connection = await MongoClient.connect('mongodb://localhost');
            const db = connection.db('horadoalmoco');

            var userRepository : UserRepository = new UserRepository(db,"user");

            userRepository.findUserByEmail(user.email).then(
                (result) => {
                    console.log(JSON.stringify(result));
                    if(true){
                        var r : messageReturn  = new messageReturn(undefined,"Erro! Usuário já cadastrado."+JSON.stringify(result));
                        callback(r);
                    }else{
                        user.password = sha512(user.password)

                        userRepository.create(user).then((result)=>{
                            var r : messageReturn  = new messageReturn(result?user:undefined,result?"Sucesso!!!":"Erro ao salvar usuario");
                            callback(r);
                        },(result)=>{
            
                        }).catch((err) => {
                            var r : messageReturn  = new messageReturn(undefined, JSON.stringify(err));
                            callback(r);
                        });
                    }
                } , (err) => {
                    var r : messageReturn  = new messageReturn(undefined,"Erro! Usuário já cadastrado."+JSON.stringify(err));
                    callback(r);
                }
            ).catch((err) => {
                var r : messageReturn  = new messageReturn(undefined,"Erro! Usuário já cadastrado."+JSON.stringify(err));
                callback(r);
            })
        })();
    }

    export function authUser (user : user, callback) : void{
        var r : messageReturn = new messageReturn(user,"Sucesso!!!");
        callback(r);
    }

}