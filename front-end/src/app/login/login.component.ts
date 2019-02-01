import { Component, OnInit } from '@angular/core';
import { user } from '../models/user';
import {Router} from "@angular/router"
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public message : String = undefined;

  constructor(private router: Router, private loginService : LoginService) { 
    
  }

  ngOnInit() {
    
    this.loginService.isAuthenticated().then((value:boolean) =>{
      if(value)
        this.router.navigate(['dashboard']);
    })
      
  }

  onSubmit(user:user) {
    this.message = undefined;
    this.loginService.authUser(user).then((message) => {
      this.message = message;
    })
  }

  gotosignup(){
    this.router.navigate(['signup']);
  }

}
