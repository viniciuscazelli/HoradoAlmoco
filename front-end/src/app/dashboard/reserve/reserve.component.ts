import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Day, Horary, ReserveDay } from 'src/app/models/Day';
import { Time } from '@angular/common';
import { ReserveService } from './reserve.service';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
  host: {
    class:'flex flex-1'
  },
  providers: [ReserveService]
})


export class ReserveComponent implements OnInit,OnDestroy {

  private day : Day
  private habilitReserve:boolean = false;
  private reservedList:Horary = null;
  private user : user;
  private obersableHorary : Observable<Horary[]>;

  constructor(private cookieService:CookieService ,private router :Router, private reserveService: ReserveService, private loginService : LoginService) { 

    this.user = JSON.parse( this.cookieService.get("user"));
    this.day = new Day(new Date(),[]);

    reserveService.getreserves(this.day.day).subscribe((value:Horary[])=>{
      this.day.horary = value;
      this.checkreserveday();
    })
   
  }

  checkreserveday(){
    this.habilitReserve = true;
    this.day.horary.forEach(horary =>{
      horary.reservations.forEach(user=>{
        if(user._id == this.user._id){
          this.habilitReserve = false;
          this.reservedList = horary;
        }
      })
    })
  }

  ngOnInit() {
    this.loginService.isAuthenticated().then((value:boolean) =>{
      if(!value)
        this.router.navigate(['/']);
    
    })
    this.reserveService.sendCurrentDate(this.day.day)    
  }


  ngOnDestroy() {
    this.reserveService.disconnect();
  }

  cancelReserve(h : Horary){
    this.reserveService.cancelReserve(new ReserveDay(this.day.day,h.hour,h.minutes));
  }

  createReserve(h : Horary){
    this.reserveService.createReserve(new ReserveDay(this.day.day,h.hour,h.minutes));
  }

  upDate(){
    var date = new Date(this.day.day);
    date.setHours(24)

    if(date.getDay() == 6){
      date.setHours(48);
    }

    
    this.reserveService.sendCurrentDate(date,this.day.day); 
    this.day.day = date;
    this.day.horary = [];
  }

  downDate(){
    var date = new Date(this.day.day);
    date.setHours(-24);

    if(date.getDay() == 0){
      date.setHours(-48);
    }

    var dateAux = new Date();
    var dateAux = new Date(dateAux.getUTCFullYear()+"-"+(dateAux.getUTCMonth() + 1)+"-"+dateAux.getUTCDate())

    if(date >= dateAux){
    
    this.reserveService.sendCurrentDate(date,this.day.day); 
    this.day.day = date;
    this.day.horary = [];
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.reserveService.disconnect();
  }

}
