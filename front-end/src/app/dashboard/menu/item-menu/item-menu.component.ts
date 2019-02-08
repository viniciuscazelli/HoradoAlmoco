import { Component, OnInit, Input } from '@angular/core';
import { menuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.css']
})
export class ItemMenuComponent implements OnInit {

  @Input() option : menuItem

  constructor() { }

  ngOnInit() {
  }

}
