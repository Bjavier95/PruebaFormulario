import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { DatauserComponent } from './pages/datauser/datauser.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'datauser', component: DatauserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);    