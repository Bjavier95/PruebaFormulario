import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { DatauserComponent } from './pages/datauser/datauser.component';
import { HomeComponent } from './pages/home/home.component';
import { HistorialComponent } from './pages/historial/historial.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'datauser', component: DatauserComponent},
    {path: 'home', component: HomeComponent},
    {path: 'datauser/:id', component: DatauserComponent},
    {path: 'historial', component: HistorialComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);    