import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { systemOptions } from 'src/app/models/systemOptions';
import { API } from 'src/app/app.api';
import { messageReturn } from 'src/app/models/messageReturn';

@Injectable()
export class SystemOptionsService {
  constructor(private http: HttpClient,private router: Router,private cookieService: CookieService) { }

  saveSystemOptions (s:systemOptions) : Promise<string>{
    return new Promise<string>((resolve) =>{
      this.http.post(`${API}/systemOptions/save`,s,{withCredentials:true}).subscribe(
        (m:messageReturn) => {
          resolve(m.message);
        }, (m:messageReturn) => {
          resolve(m.message);
        }
      )
    });
  }

  getSystemOptions () : Promise<systemOptions>{
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
