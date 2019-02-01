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
import { ConfigurationComponent } from './dashboard/configuration/configuration.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { LogoutComponent } from './logout/logout.component';
import { ListComponent } from './dashboard/options/list/list.component';
import { LogoutService } from './logout/logout.service';
import { CookieService } from 'ngx-cookie-service';
import { SystemOptionsComponent } from './dashboard/system-options/system-options.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DecorBarComponent,
    DashboardComponent,
    HeaderComponent,
    SignupComponent,
    ConfigurationComponent,
    OptionsComponent,
    LogoutComponent,
    ListComponent,
    SystemOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    LoginService,LogoutService, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
