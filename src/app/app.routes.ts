import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { DatauserComponent } from './pages/datauser/datauser.component';
import { HomeComponent } from './pages/home/home.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { AutenticadoGuard } from "./guards/autenticado.guard";

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'datauser', component: DatauserComponent, canActivate: [AutenticadoGuard]},
    {path: 'home', component: HomeComponent ,canActivate: [AutenticadoGuard]},
    {path: 'datauser/:id', component: DatauserComponent, canActivate: [AutenticadoGuard]},
    {path: 'historial', component: HistorialComponent, canActivate: [AutenticadoGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);    