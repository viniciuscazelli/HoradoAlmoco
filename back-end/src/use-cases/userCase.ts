import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { MongoClient } from "mongodb";
import {UserRepository} from "../repository/UserRepository";
import { sha512 } from "js-sha512"
import { config } from "../config";

export module userCase {

    export function saveUser(user : user) : Promise<messageReturn>{
        return new Promise<messageReturn>((resolve) => {
            (async () => {

                if(!user || !user.email || !user.name || !user.password){
                    var r : messageReturn  = new messageReturn(undefined,"Preencha os campos corretamente!", 400);
                    resolve(r);
                    return;
                }

                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
    
                var userRepository : UserRepository = new UserRepository(db,"user");
    
                userRepository.findUserByEmail(user.email).then(
                    (result) => {
                        console.log(JSON.stringify(result));
                        if(result.length > 0){
                            var r : messageReturn  = new messageReturn(null,"Erro! Usuário já cadastrado."+JSON.stringify(result));
                            resolve(r);
                        }else{
                            user.password = sha512(user.password)
    
                            userRepository.create(user).then((result)=>{
                                var r : messageReturn  = new messageReturn(result?user:undefined,result?"Sucesso!!!":"Erro ao salvar usuario");
                                resolve(r);
                            },(result)=>{
                
                            }).catch((err) => {
                                var r : messageReturn  = new messageReturn(undefined, JSON.stringify(err));
                                resolve(r);
                            });
                        }
                    } , (err) => {
                        var r : messageReturn  = new messageReturn(undefined,"Erro desconhecido! "+JSON.stringify(err));
                        resolve(r);
                    }
                ).catch((err) => {
                    var r : messageReturn  = new messageReturn(undefined,"Erro desconhecido! "+JSON.stringify(err));
                    resolve(r);
                })
            })();
        });
    }

    export function authUser (user : user): Promise<messageReturn>{
        return new Promise<messageReturn>((resolve) => {
            (async () => {

            if(!user || !user.email || !user.password){
                var r : messageReturn  = new messageReturn(null,"Preencha os campos corretamente!", 400);
                resolve(r);
                return;
            }


            const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
            const db = connection.db(config.database);

            var userRepository : UserRepository = new UserRepository(db,"user");

            userRepository.findUserByEmailAndPassword(user.email, sha512(user.password)).then(
                (user:user) => {
                    var r : messageReturn  = new messageReturn(user,user && user != null? "Sucesso!" : "Usuario e/ou senha incorreto(s)!", user && user != null?200:401);
                    resolve(r);
                }            
            );
            })();
        });
    }

}