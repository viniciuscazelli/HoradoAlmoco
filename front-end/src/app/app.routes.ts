import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DecorBarComponent} from './decor-bar/decor-bar.component'
import { DashboardComponent } from './dashboard/dashboard.component';


export const ROUTES: Routes = [

{path: '', component: LoginComponent},
{path: 'dashboard', component: DashboardComponent}

//children: [
//   {path: '', component: null}
//]

]
