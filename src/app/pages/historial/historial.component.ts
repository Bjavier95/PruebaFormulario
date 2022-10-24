import { Component, OnInit } from '@angular/core';
import { jsonServicios } from 'src/app/services/jsonServicios.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor( private jsonServices : jsonServicios ) { }

  ngOnInit(): void {
    this.obtenerCompras();
  }

  
 obtenerCompras(){
  this.jsonServices.obtenerCompras().subscribe(resp => {
    console.log('compras: ', resp);
  });
 }

}
