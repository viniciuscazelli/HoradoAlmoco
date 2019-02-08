import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { MongoClient } from "mongodb";
import {UserRepository} from "../repository/UserRepository";
import { sha512 } from "js-sha512"
import { config } from "../config";
import { utilCase } from "./util";

export module userCase {

    export function saveUser(user : user) : Promise<messageReturn<user>>{
        return new Promise<messageReturn<user>>((resolve) => {
            (async () => {
               
                if(!user || !user.email || !user.name || !user.password){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Preencha os campos corretamente!", 400);
                    resolve(r);
                    return;
                }

                if(user.name.length < 3 || user.name.length > 200){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres", 400);
                    resolve(r);
                    return;
                }

                if(user.email.length < 6 || user.email.length > 200){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Tamanho incorretoa do campo email digite um email com tamanho entre 6 e 200 caracteres", 400);
                    resolve(r);
                    return;
                }

                if(user.password.length < 6 || user.password.length > 50){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Tamanho incorreto do campo senha digite uma senha com tamanho entre 6 e 50 caracteres", 400);
                    resolve(r);
                    return;
                }

                if(user.name.toUpperCase() == 'ADMIN'){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Nome indisponível", 400);
                    resolve(r);
                    return;
                }

                if(!utilCase.textValidate(user.name,"[a-zA-Z0-9 \_,.@-]")){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Caracteres invalidos para o nome", 400);
                    resolve(r);
                    return;
                }

                if(!utilCase.textValidate(user.email,"[a-zA-Z0-9\_,.@-]")){
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Caracteres invalidos para o email", 400);
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
                            var r : messageReturn<user>  = new messageReturn<user>(null,"Erro! Usuário já cadastrado."+JSON.stringify(result),400);
                            resolve(r);
                        }else{
                            user.password = sha512(user.password)
    
                            userRepository.create(user).then((result)=>{
                                var r : messageReturn<user>  = new messageReturn<user>(result?user:undefined,result?"Sucesso!!!":"Erro ao salvar usuario", result? 200 : 500);
                                resolve(r);
                            },(result)=>{
                
                            }).catch((err) => {
                                var r : messageReturn<user>  = new messageReturn<user>(undefined, JSON.stringify(err));
                                resolve(r);
                            });
                        }
                    } , (err) => {
                        var r : messageReturn<user>  = new messageReturn<user>(undefined,"Erro desconhecido! "+JSON.stringify(err),500);
                        resolve(r);
                    }
                ).catch((err) => {
                    var r : messageReturn<user>  = new messageReturn<user>(undefined,"Erro desconhecido! "+JSON.stringify(err),500);
                    resolve(r);
                })
            })();
        });
    }

    export function authUser (user : user): Promise<messageReturn<user>>{
        return new Promise<messageReturn<user>>((resolve) => {
            (async () => {

            if(!user  || !user.email || !user.password){
                var r : messageReturn<user>  = new messageReturn<user>(null,"Preencha os campos corretamente!", 400);
                resolve(r);
                return;
            }


            const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
            const db = connection.db(config.database);

            var userRepository : UserRepository = new UserRepository(db,"user");

            userRepository.findUserByEmailAndPassword(user.email, sha512(user.password)).then(
                (user:user) => {
                    var r : messageReturn<user>  = new messageReturn<user>(user,user && user != null? "Sucesso!" : "Usuario e/ou senha incorreto(s)!", user && user != null?200:401);
                    resolve(r);
                }            
            );
            })();
        });
    }

}