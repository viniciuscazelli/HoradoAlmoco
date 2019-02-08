import { messageReturn } from "../models/messageReturn";
import { MongoClient } from "mongodb";
import { config } from "../config";
import { ReserveRepository } from "../repository/reserveRepository";
import { Day, Horary, ReserveDay } from "../models/Day";
import { user } from "../models/user";

export module reserveCase {

    export function getReserve(date : Date) : Promise<Day>{
        return new Promise<Day>((resolve) => {
            (async () => {
                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
    
                var reserveRepository : ReserveRepository = new ReserveRepository(db,"reserve");
                
                date = new Date(date);
               

                reserveRepository.findAggregateUser({"day" : { 
                    '$gte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()), 
                    '$lte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getUTCDate()+1)) }}).then((value:Day[])=>{

                    var r: Day = reserveCase.getDefaultDay(date)
                    
                    if(value && value.length > 0){
                        value[0].horary.forEach(element =>{
                            for(var i = 0; i < r.horary.length; i++){
                                if( r.horary[i].hour == element.hour &&
                                    r.horary[i].minutes == element.minutes){
                                    r.horary[i].reservations = element.reservations;
                                }
                            }
                        })
                    }
                    
                    resolve(r);
                },() => resolve(reserveCase.getDefaultDay(date))).catch(() => {
                    resolve(reserveCase.getDefaultDay(date))
                })

            })();
        });
    }

    export function removeReserve(d: ReserveDay, u : user){
        return new Promise<Day>((resolve) => {
            (async () => {
                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
    
                var reserveRepository : ReserveRepository = new ReserveRepository(db,"reserve");

                var date = new Date(d.day);

                reserveRepository.removeReserve(d,u).then(value =>{
                    if(value)
                    getReserve(d.day).then(v =>{
                        resolve(v);
                    })
                });
            })();
        });
    }

    export function saveReserve(d: ReserveDay, u : user){
        return new Promise<Day>((resolve) => {
            (async () => {
                const connection = await MongoClient.connect(config.url, { useNewUrlParser: true });
                const db = connection.db(config.database);
    
                var reserveRepository : ReserveRepository = new ReserveRepository(db,"reserve");

                var date = new Date(d.day);

                var dateNow = new Date();
                
                if( new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()) < 
                    new Date(dateNow.getUTCFullYear()+"-"+(dateNow.getUTCMonth() + 1)+"-"+dateNow.getUTCDate())){
                        resolve(null);
                        return;
                    }

                this.SaveRecursive = function(){
                    reserveRepository.findAggregateUser({"day" : { 
                    '$gte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate()), 
                    '$lte': new Date(date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+(date.getUTCDate()+1)) }}).then((value:Day[])=>{
                       if(!checkUserReservedInDay(value, u)){
                            if(!value || value.length == 0){
                                reserveRepository.addDayReservation(d).then(res =>{
                                    this.SaveRecursive();
                                })
                            }else{
                                var r: Day = reserveCase.getDefaultDay(date)
                                var b : boolean = false;
                                value[0].horary.forEach(element =>{
                                    if(d.hour == element.hour &&
                                        d.minutes == element.minutes){
                                        b = true;
                                    }
                                })

                                if(b){
                                    reserveRepository.addreserve(d,u).then(value => {
                                        getReserve(d.day).then(v =>{
                                            resolve(v);
                                        })
                                    })
                                }else{
                                    reserveRepository.addHoraryReservation(d).then(res =>{
                                        this.SaveRecursive();
                                    })
                                }
                            }
                        }else{
                            resolve(undefined);
                        }
                    });
                }

                this.SaveRecursive()
            })();
        });
    }

    export function checkUserReservedInDay(day : Day[], u : user){
        var response = false;
        if(day && day.length >0){
            day[0].horary.forEach((horary) =>{
                horary.reservations.forEach((reserve) =>{
                    if(reserve._id == u._id)
                        response = true;
                })
            })
        }
        return response;
    }

    export function getDefaultDay(date : Date) : Day {
        var day: Day = new Day(date,[]);
        day.horary.push(new Horary(11,0,[]));
        day.horary.push(new Horary(11,15,[]));
        day.horary.push(new Horary(11,30,[]));
        day.horary.push(new Horary(11,45,[]));
        day.horary.push(new Horary(12,0,[]));
        day.horary.push(new Horary(12,15,[]));
        day.horary.push(new Horary(12,30,[]));
        day.horary.push(new Horary(12,45,[]));
        day.horary.push(new Horary(13,0,[]));
        day.horary.push(new Horary(13,15,[]));
        day.horary.push(new Horary(13,30,[]));
        return day;
    }
}