import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { user } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    class:'flex flex-1'
  }
})
export class DashboardComponent implements OnInit {

  private user: user;

  constructor(private router:Router, private loginService : LoginService,private cookieService:CookieService) {
    this.user = JSON.parse( this.cookieService.get("user"));
   }

  ngOnInit() {
    this.loginService.isAuthenticated().then((value:boolean) =>{
      if(!value)
        this.router.navigate(['/']);
    
    })
    
  }

}
