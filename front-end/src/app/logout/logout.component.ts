import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from './logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router,private logoutService : LogoutService) { }

  ngOnInit() {
    setTimeout(() => {
      this.logoutService.logout().then(() =>
      {
        this.router.navigate(['/']);
      })
    }, 3000);
  }

}
