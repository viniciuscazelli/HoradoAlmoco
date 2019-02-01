import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { MongoClient } from "mongodb";
import {UserRepository} from "../repository/UserRepository";
import { sha512 } from "js-sha512"
import { config } from "../config";
import { systemOptions } from "../models/systemOptions";
import { SystemOptionsRepository } from "../repository/SystemOptionsRepository";

export module systemOptionsCase {

    export function getSystemOptions() : Promise<messageReturn>{
        return new Promise<messageReturn>((resolve) => {
            (async () => {

                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
                
                var systemOptionsRepository : SystemOptionsRepository = new SystemOptionsRepository(db,"systemOptions");

                systemOptionsRepository.getfirstConfig().then((value:systemOptions)=>{

                    if(value == undefined || value == null || value._id == undefined || value._id == null){
                        value = new systemOptions("",false);
                    }
                   
                    var r : messageReturn  = new messageReturn(value, "Sucesso!", 200);
                    resolve(r);
                })
            })();
        });
    }

    export function saveSystemOptions(systemOptions : systemOptions) : Promise<messageReturn>{
        return new Promise<messageReturn>((resolve) => {
            (async () => {

                
                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
    
                var systemOptionsRepository : SystemOptionsRepository = new SystemOptionsRepository(db,"systemOptions");
    
                systemOptionsRepository.getfirstConfig().then((value:systemOptions) =>{
                    if(value != undefined && value != null && value._id != undefined && value._id != null){
                        systemOptions._id = value._id;
                        console.log(systemOptions);
                        systemOptionsRepository.update(systemOptions._id,systemOptions).then(res => {
                        if(res){
                            var r : messageReturn  = new messageReturn(systemOptions, "Sucesso!", 200);
                            resolve(r);
                        }else{
                            var r : messageReturn  = new messageReturn(systemOptions, "Falha ao atualizar as opções do sistema!", 200);
                            resolve(r);
                        }
                        });
                    }else{
                        systemOptionsRepository.create(systemOptions).then((value)=>{
                            systemOptions._id = value;
                            var r : messageReturn  = new messageReturn(systemOptions, "Sucesso!", 200);
                            resolve(r);
                        })
                    }
                })
            })();
        });
    }

    

}