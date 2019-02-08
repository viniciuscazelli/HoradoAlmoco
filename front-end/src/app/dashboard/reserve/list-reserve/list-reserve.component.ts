import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Horary } from 'src/app/models/Day';

@Component({
  selector: 'app-list-reserve',
  templateUrl: './list-reserve.component.html',
  styleUrls: ['./list-reserve.component.css']
})
export class ListReserveComponent implements OnInit {

  @Input() horary:Horary;
  @Input() habilitRemoveReserve: boolean;
  @Input() habilitReserve: boolean;
  @Output() cancelReserve: EventEmitter<Horary> = new EventEmitter();
  @Output() createReserve: EventEmitter<Horary> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  _cancelReserve(){
    this.cancelReserve.emit(this.horary);
  }

  _createReserve(){
    this.createReserve.emit(this.horary);
  }

}
