import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { DatauserComponent } from './pages/datauser/datauser.component';
import { CompraComponent } from './pages/compra/compra.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'datauser', component: DatauserComponent},
    {path: 'compra/:id', component: CompraComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);    