import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DecorBarComponent} from './decor-bar/decor-bar.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ConfigurationComponent } from './dashboard/configuration/configuration.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { LogoutComponent } from './logout/logout.component';
import { SystemOptionsComponent } from './dashboard/system-options/system-options.component';


export const ROUTES: Routes = [

{path: '', component: LoginComponent ,},
{path: 'signup', component: SignupComponent},
{path: 'logout', component: LogoutComponent},

{path: 'dashboard', component: DashboardComponent,
children: [
    {path: 'options', component: OptionsComponent,data: 
        { 
            title: 'Opções', 
            options: [
                {title: "Configuração", routerLink : "" , options : [
                    {title: "Alterar senha", routerLink : "/dashboard/alterPassword",options:[],activeRouterLink : true , showOnlyAdmin : false},
                    {title: "Opções do sistema", routerLink : "/dashboard/systemOptions",options:[],activeRouterLink : true , showOnlyAdmin : true}
                ] , activeRouterLink : false, showOnlyAdmin : false },
                {title: "Sair", routerLink : "/logout",options:[],activeRouterLink : true, showOnlyAdmin : false }
            ] 
        }
    },

    {path: 'systemOptions', component: SystemOptionsComponent}
  ]}
]
