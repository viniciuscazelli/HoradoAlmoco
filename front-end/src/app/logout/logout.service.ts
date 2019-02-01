import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { API } from '../app.api';
import { messageReturn } from '../models/messageReturn';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {

 
  constructor(private http: HttpClient,private router: Router) {
   }

  logout () : Promise<boolean>{
    return new Promise<boolean>((resolve) => { 
      this.http.get(`${API}/user/logout`,{withCredentials:true})
      .subscribe((m:messageReturn) => {
        console.log(m);
        resolve(m.code == 200)       
      },(err) => {
        resolve(false)
      })
    });
  }
}
