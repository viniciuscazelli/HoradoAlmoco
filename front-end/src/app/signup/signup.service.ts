import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { systemOptions } from '../models/systemOptions';
import { messageReturn } from '../models/messageReturn';
import { API } from '../app.api';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService) {
  }

  saveuser(u:user) : Promise<string>{
    return new Promise<string>((resolve)=>{
      this.http.post(`${API}/user/new`,u,{withCredentials:true}).subscribe(
        (m:messageReturn) => {
          if(m.message == "Sucesso!"){
            this.cookieService.set("user", JSON.stringify(m.res));
            this.router.navigate(['dashboard']);
          }else
            resolve(m.message);
        }
      )
    });
  }

  getrules() : Promise<systemOptions>{
    return new Promise<systemOptions>((resolve) =>{
      this.http.get(`${API}/systemOptions/get`,{withCredentials:true}).subscribe(
        (m:messageReturn) => {
          resolve(m.res);
        }, (m:messageReturn) => {
          resolve(m.res);
        }
      )
    });
  }
}
