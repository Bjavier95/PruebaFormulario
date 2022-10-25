import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    // private loginService: LoginService,
    private router: Router
    ) {
      // environment.guard = true; 
  }
  canActivate(): boolean {
    // console.log('Guard',environment.guard);
    if (environment.guard) {
      // console.log('pasó guard');
      return true;
    } else {
      console.log('bloqueado por guard');
      this.router.navigateByUrl('/login');
      return false;

    }

  }
}
