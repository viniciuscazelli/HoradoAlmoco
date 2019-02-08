import { Component,Input, OnInit } from '@angular/core';
import { options } from 'src/app/models/options';
import {  ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  private options: options;

  private user:user= new user("","","");

  constructor(private router : Router,private loginService: LoginService, private route: ActivatedRoute,private cookieService:CookieService) {
    this.user = JSON.parse( this.cookieService.get("user"));
   }

  ngOnInit() {
    this.route.data.subscribe((v:options) => {
      this.options = v;
    });

    this.loginService.isAuthenticated().then((value:boolean) =>{
      if(!value)
        this.router.navigate(['/']);
    
    })
  }

}
