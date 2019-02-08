import { IRead } from "../interfaces/iRead";
import { IWrite } from "../interfaces/iWrite";
import { Collection, Db, FilterQuery } from "mongodb";


export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    
    public  _collection: Collection;
    

    constructor(db: Db, collectionName: string) {
        this._collection = db.collection(collectionName);
        if(this._collection)
             db.createCollection(collectionName).then((collection) => {
                this._collection = collection; 
             });
    }

    create(item: T): Promise<string> {
        return new Promise<string>((resolve) => {
            this._collection.insertOne(item,(err,docInserted)=>{

                let _id : string = docInserted.insertedId.toHexString();

                resolve(!err? _id : null);
            })
        });
    }
    
    update(id: string, item: T): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._collection.updateOne({"_id":id},{ $set:item},(err)=>{
                
                resolve(!err);
            })
        });
    }
    delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            this._collection.deleteOne({"_id":id},(err)=>{
                resolve(!err);
            })
        });
    }
    find(query): Promise<T[]> {
        console.log(query);
        return this._collection.find(query).toArray();
    }
    findOne(id: string): Promise<T> {
        return new Promise<T>((resolve) => {
            this._collection.findOne({},(err, result : T) =>{
                if (err) resolve(undefined);
                resolve(result);
            })           
        });
    }

}