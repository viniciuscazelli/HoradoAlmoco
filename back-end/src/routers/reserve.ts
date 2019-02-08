import { authController } from "../controller/authController";
import { reserveCase} from "../use-cases/reserveCase"
import { reserveController } from "../controller/reserveController";
import { Day } from "../models/Day";

module.exports = function (app:any,io:any, sockets: Set<any>) { 

    io.on('connection',  function(socket){
        if(authController.isAuthenticatedBySession(socket.handshake.session)){
            sockets.add(socket);
            socket.on("getDatabyDay", (date) => {
                reserveCase.getReserve(date.date).then((value)=>{
                    socket.emit("databyDay",value.horary);
                })
            })
            socket.on('disconnect', () => {
                sockets.delete(socket);
            });
        }
    });

    app.post('/reserve/save', function (req, res) {
        reserveController.saveReserve(req,res,function(d : Day){
            if(d)
                sockets.forEach(element => {
                    element.emit('reserve'+d.day.getUTCFullYear()+"-"+(d.day.getUTCMonth() + 1)+"-"+d.day.getUTCDate(), d.horary);
                });
            
                res.send();
        });
    });

    app.post('/reserve/cancel', function (req, res) {
        reserveController.removeReserve(req,res,function(d : Day){
            if(d)
                sockets.forEach(element => {
                    element.emit('reserve'+d.day.getUTCFullYear()+"-"+(d.day.getUTCMonth() + 1)+"-"+d.day.getUTCDate(), d.horary);
                });
            res.send();
        });
    });

}