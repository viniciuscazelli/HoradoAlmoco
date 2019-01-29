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

    countUserByEmail(email:string): Promise<number> {
        return this._collection.count({email:email});          
    }
}