import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() user:user;

  constructor(public router: Router) { }

  
  ngOnInit() {
    
  }

 
}
