import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(  public router: Router ) { }

  ngOnInit(): void {
  }

  salir(){
    Swal.fire({
      title: 'Espere',
      text: 'Cerrando sesión...',
      icon: 'info'
    });
    Swal.showLoading();
      setTimeout(() => {
        this.router.navigateByUrl('login');
        Swal.close();
      }, 1500);
  }

}
