import { Component, OnInit } from '@angular/core';
import { SystemOptionsService } from './system-options.service';
import { systemOptions } from 'src/app/models/systemOptions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-options',
  templateUrl: './system-options.component.html',
  styleUrls: ['./system-options.component.css'],
  providers: [SystemOptionsService]
})
export class SystemOptionsComponent implements OnInit {

  constructor(private systemOptionsService : SystemOptionsService, private router: Router) { }
  private systemOptons : systemOptions = new systemOptions("",false);
  private message : string;
  private loading : boolean = true;
  ngOnInit() {
    this.getData();
  }

  getData(){
    this.systemOptionsService.getSystemOptions().then(value =>{
      this.systemOptons = value;
      this.loading = false;
    })
  }

  onSubmit(s:systemOptions) {
    this.loading = true;
    this.message = undefined;
    this.systemOptionsService.saveSystemOptions(s).then((message) => {
      this.message = message;
      this.getData();
    })
  }

  gotohome(){
    this.router.navigate(['/dashboard']);
  }


}
