import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespPaises } from 'src/app/Models/respPaises.models';


@Injectable({
  providedIn: 'root'
})
export class jsonServicios {

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
}
