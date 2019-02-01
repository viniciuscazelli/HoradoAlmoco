import { BaseRepository } from "./BaseRepository"
import { user } from "../models/user"
import { systemOptions } from "../models/systemOptions";
import { messageReturn } from "../models/messageReturn";

export class SystemOptionsRepository extends BaseRepository<systemOptions>{

    getfirstConfig(): Promise<systemOptions> {
        return new Promise<systemOptions>((resolve) => {
            this._collection.find({}).toArray().then((value: systemOptions[]) => {
                
                if(value && value.length > 0)                    
                    resolve(value[0]);  
                 
                resolve(undefined);
            });
        });
    }
}