import { Component, OnInit } from '@angular/core';
import { menuItem } from 'src/app/models/menuItem';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private options : menuItem[] =[];

  constructor(private loginService:LoginService, private router : Router) {
    this.options.push(new menuItem("Reserva","/dashboard/reserve","event_available"));
    this.options.push(new menuItem("Grupos","/dashboard/group","group"));
    this.options.push(new menuItem("Restaurantes","/dashboard/restaurant","star_half"));
  }

  ngOnInit() {
    this.loginService.isAuthenticated().then((value:boolean) =>{
      if(!value)
        this.router.navigate(['/']);
    
    })
  }

}
