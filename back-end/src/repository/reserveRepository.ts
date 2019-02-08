import { BaseRepository } from "./BaseRepository"
import { Day, ReserveDay } from "../models/Day";
import { user } from "../models/user";
import { ObjectID } from "bson";

export class ReserveRepository extends BaseRepository<Day>{

    findAggregateUser(query): Promise<Day[]> {
        return this._collection.aggregate([
            {
              '$match': query
            },{
                '$unwind': {
                  'path': '$horary',
                  'preserveNullAndEmptyArrays': true
                }
              }, {
              '$lookup': {
                'from': 'user', 
                'localField': 'horary.reservations.user_id', 
                'foreignField': '_id', 
                'as': 'horary.reservations'
              }
            },{
                '$group': {
                  '_id': '$_id', 
                  'day': {
                    '$first': '$day'
                  }, 
                  'horary': {
                    '$push': '$horary'
                  }
                }
              }
          ]).toArray();
    }

    addreserve(d: ReserveDay, u : user): Promise<boolean> {
        return new Promise<boolean>((resolve) => {

            var date = new Date(d.day);

            this._collection.updateOne({"day" : { 
                '$gte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()), 
                '$lte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getUTCDate()+1)) },
                "horary.hour" : d.hour, 
                "horary.minutes" : d.minutes },{ "$push":{"horary.$.reservations": 
                    {
                        "user_id": new ObjectID(u._id)
                    }
                }},(err)=>{
               
                resolve(!err);
            })
        });
    }

    removeReserve(d: ReserveDay, u : user): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            var date = new Date(d.day);

            this._collection.updateOne({"day" : { 
                '$gte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()), 
                '$lte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getUTCDate()+1)) },
                "horary.hour" : d.hour, 
                "horary.minutes" : d.minutes },{ "$pull":{"horary.$.reservations": 
                    {
                        "user_id": new ObjectID(u._id)
                    }
                }},(err)=>{
                resolve(!err);
            })
        });
    }

    addDayReservation(d : ReserveDay): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            d.day = new Date(d.day);
            d.day = new Date(d.day.getUTCFullYear()+"-"+(d.day.getUTCMonth() + 1)+"-"+d.day.getUTCDate()+" 10:00");
            this.create(new Day(new Date(d.day),[])).then(value =>{
                resolve(value != null);
            });
        });
    }

    addHoraryReservation(d:ReserveDay):Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            var date = new Date(d.day);
            this._collection.updateOne({"day" : { 
                '$gte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()), 
                '$lte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getUTCDate()+1)) }
            },{ "$push":{"horary": 
                {
                    "hour": d.hour,
                    "minutes": d.minutes,
                    "reservations":  []
                }
            }},(err)=>{
                resolve(!err);
            });
        });
    }
}