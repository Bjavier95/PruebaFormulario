import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

            
  constructor( public router: Router  ) {
    
    }

  ngOnInit(): void {
    environment.guard = false;
  }

  login(){
    environment.guard = true; 
    Swal.fire({
      title: 'Espere',
      text: 'Iniciando sesión...',
      icon: 'info'
    });
    Swal.showLoading();
      setTimeout(() => {
        this.router.navigateByUrl('home');
        Swal.close();
      }, 1500);
  }

}
