import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { compraModel } from '../Models/compraModel.models';

@Injectable({
  providedIn: 'root'
})
export class jsonServicios {

  url = 'https://formtest-a7601-default-rtdb.firebaseio.com';

  constructor( private httpClient: HttpClient ) { 
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
    return this.httpClient.post(`${this.url}/compras.json`, compra);
  }
}
