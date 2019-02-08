import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {ROUTES} from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DecorBarComponent } from './decor-bar/decor-bar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginService} from './login/login.service';
import { HttpClientModule  } from '@angular/common/http';
import { OptionsComponent } from './dashboard/options/options.component';
import { LogoutComponent } from './logout/logout.component';
import { ListComponent } from './dashboard/options/list/list.component';
import { LogoutService } from './logout/logout.service';
import { CookieService } from 'ngx-cookie-service';
import { SystemOptionsComponent } from './dashboard/system-options/system-options.component';
import { SystemOptionsService } from './dashboard/system-options/system-options.service';
import { SignupService } from './signup/signup.service';
import { MenuComponent } from './dashboard/menu/menu.component';
import { ItemMenuComponent } from './dashboard/menu/item-menu/item-menu.component';
import { ReserveComponent } from './dashboard/reserve/reserve.component';
import { ListReserveComponent } from './dashboard/reserve/list-reserve/list-reserve.component';
import { ReserveService } from './dashboard/reserve/reserve.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecorBarComponent,
    DashboardComponent,
    HeaderComponent,
    SignupComponent,
    OptionsComponent,
    LogoutComponent,
    ListComponent,
    SystemOptionsComponent,
    MenuComponent,
    ItemMenuComponent,
    ReserveComponent,
    ListReserveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    RouterModule.forRoot(ROUTES),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    LoginService,
    CookieService, 
    SystemOptionsService,
    Ng4LoadingSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
