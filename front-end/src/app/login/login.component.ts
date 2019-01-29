import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  public message : String = undefined;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
      //this.router.navigate(['dashboard']);
  }

  onSubmit(login:Login) {
      this.message = "Erro usuario e/ou senha incorreto(s)!"
      
  }

  

}
