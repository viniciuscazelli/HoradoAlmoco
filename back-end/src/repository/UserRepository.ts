import { BaseRepository } from "./BaseRepository"
import { user } from "../models/user"

export class UserRepository extends BaseRepository<user>{

    
    countOfUsers(): Promise<number> {
        return this._collection.count({})
    }

    findUserByEmail(email:string): Promise<user[]> {
        return new Promise<user[]>((resolve) => {
            this._collection.find({"email": email}).toArray().then((value: user[]) => {
                resolve(value);   
            });       
            
        });
    }

    findUserByEmailAndPassword(email:string, password: string ): Promise<user> {
        return new Promise<user>((resolve) => {
            this._collection.findOne({email:email, password: password},(err, result : user) =>{
                if (err) {
                    resolve(undefined);
                    return
                }
                resolve(result);
            })           
        });
    }

    countUserByEmail(email:string): Promise<number> {
        return this._collection.count({email:email});          
    }
}