import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { SignupService } from './signup.service';
import { systemOptions } from '../models/systemOptions';
import { user } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  host: {
    class:'flex flex-1'
  },
  providers:[SignupService]
})
export class SignupComponent implements OnInit {

  private loading : boolean = true;
  private roules : systemOptions;
  private message : string;
  constructor(private router: Router, private signupService: SignupService) { }
  
  ngOnInit() {
    this.signupService.getrules().then(r =>{
      this.roules= r;
      if(!this.roules.activeSignup)
        this.router.navigate(['']);
      this.loading = false;
    })
  }

  onSubmit(user:user) {

    if(user.email.endsWith(this.roules.prefix)){
      this.message = undefined;
      this.signupService.saveuser(user).then((message) => {
        this.message = message;
      })
    }else{
      this.message = "este email não é suportado!"
    }
  }

  gotologin(){
    this.router.navigate(['']);
  }
}
