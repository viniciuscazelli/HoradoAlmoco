import { Component, OnInit, Input } from '@angular/core';
import { optionsItens } from 'src/app/models/options';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-options-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})



export class ListComponent implements OnInit {

  @Input() options : optionsItens[]
  @Input() user:user

  constructor() { }

  ngOnInit() {
    console.log(this.options);
    console.log(this.user.name);
  }

}
