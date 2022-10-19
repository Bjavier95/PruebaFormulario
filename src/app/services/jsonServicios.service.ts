import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { compraModel } from '../Models/compraModel.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class jsonServicios {

  url = 'https://formtest-a7601-default-rtdb.firebaseio.com';
  compra!: compraModel;


  constructor( private httpClient: HttpClient ) { 
    this.compra = {
      "id": "",
      "idPais": "",
      "nombre": "",
      "nit": "",
      "ubicaciones": [
          {
              "idDepartamento": "",
              "idCiudad": "",
              "direcciones": [
                  {
                      "idTipoDireccion": "",
                      "direccion": ""
                  }
              ]           
          },
      ],
      "piezas": [
          {
              "cantidad": "",
              "descripcion": "",
              "precioUnitario": "",
              "total": ""
          }
      ],
      "total": "" 
    };
  }

  getPaisesService(url: string): Observable<any>{
    return this.httpClient.get(url);
  }

  getCiudadesService(url: string): Observable<any>{
    return this.httpClient.get(url);
  }

  getDepartamentosService(url: string): Observable<any>{
    return this.httpClient.get(url);
  }
  
  getTiposDireccionesService(url: string): Observable<any>{
    return this.httpClient.get(url);
  }

  guardarCompra(compra: compraModel){
    return this.httpClient.post(`${this.url}/compras.json`, compra)
        .pipe(
          map((resp: any) => {
            console.log('resp: ', resp);
            this.compra.id = resp.name;
            return compra;
        }));
  }
}
