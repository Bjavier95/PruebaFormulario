import { Component, OnInit } from '@angular/core';
import { jsonServicios } from 'src/app/services/jsonServicios.service';
import { compraModel } from '../../Models/compraModel.models';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  compras: compraModel[] = [];
  constructor( private jsonServices : jsonServicios ) { }

  ngOnInit(): void {
    this.obtenerCompras();
  }
  
 obtenerCompras(){
  this.jsonServices.obtenerCompras().subscribe(resp => {
    this.compras = resp;
    // console.log('compras: ', this.compras);
  });
 }

}
