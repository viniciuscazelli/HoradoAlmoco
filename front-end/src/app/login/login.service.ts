import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/user';
import { API } from '../app.api';
import { messageReturn } from '../models/messageReturn';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

 
  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService) {
   }

  authUser (u:user) : Promise<string>{
    return new Promise<string>((resolve) =>{
      this.http.post(`${API}/user/auth`,u,{withCredentials:true}).subscribe(
        (m:messageReturn) => {
          if(m.message == "Sucesso!"){
            this.cookieService.set("user", JSON.stringify(m.res));
            this.router.navigate(['dashboard']);
          }else
            resolve(m.message);
        }, (m:messageReturn) => {
          resolve(m.message);
        }
      )
    });
  }
  
  isAuthenticated () : Promise<boolean>{
    return new Promise<boolean>((resolve) => { 
      this.http.get(`${API}/user/isAuthenticated`,{withCredentials:true})
      .subscribe((m:messageReturn) => {
        resolve(m.code == 200)       
      },(err) => {
        resolve(false)
      })
    });
  }
}
