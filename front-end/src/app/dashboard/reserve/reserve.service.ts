import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { Horary, ReserveDay } from 'src/app/models/Day';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/app.api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class ReserveService {

  observer: Observer<Horary[]>;
  private socket: any = socketIo(":3001");;
  constructor(private http: HttpClient,private load: Ng4LoadingSpinnerService) { }

  getreserves(date: Date) : Observable<Horary[]> {
    
    this.RegisterEventReserves(date);

    this.socket.on('databyDay', response => {
      this.load.hide();
      return this.observer.next(response);
    });

    return this.createObservable();
  }



  RegisterEventReserves(date: Date){
    this.socket.on('reserve'+date.getUTCFullYear()+"-"+(date.getUTCMonth() + 1)+"-"+date.getUTCDate(), response => {
      return this.observer.next(response);
    });
  }

  sendCurrentDate(date: Date, oldDate? : Date ) {
    this.load.show();
    this.socket.emit('getDatabyDay', {date:date});
    
    if(oldDate){
      this.socket.removeListener('reserve'+oldDate.getUTCFullYear()+"-"+(oldDate.getUTCMonth() + 1)+"-"+oldDate.getUTCDate());
      this.RegisterEventReserves(date);
    }
    
  }

  createObservable() : Observable<Horary[]> {
    return new Observable(observer => this.observer = observer);
  }

  disconnect(){
    this.socket.disconnect();
  }
  
  createReserve (d : ReserveDay) : Promise<boolean>{
    return new Promise<boolean>((resolve) =>{
      this.load.show();
      this.http.post(`${API}/reserve/save`,d,{withCredentials:true}).subscribe(
        () => {
          this.load.hide();
          resolve(true);
        }, () => {
          this.load.hide();
          resolve(false);
        }
      )
    });
  }

  cancelReserve (d : ReserveDay) : Promise<boolean>{
    return new Promise<boolean>((resolve) =>{
      this.load.show();
      this.http.post(`${API}/reserve/cancel`,d,{withCredentials:true}).subscribe(
        () => {
          this.load.hide();
          resolve(true);
        }, () => {
          this.load.hide();         
          resolve(false);
        }
      )
    });
  }
  
   
}
