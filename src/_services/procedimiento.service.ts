import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService extends HttpService {

  urlListarProcedimientos: String;
  constructor(
    protected http: HttpClient
  ) { 
    super(http);
    this.urlListarProcedimientos=this.apiURL;
    this.apiURL += 'getProcedimiento';
  }

  /**
    * Obtiene una persona
    * @param codigo identificador del procedimiento
    */
   getCodigo(codigo: string){
    return this.http.get(
      `${this.apiURL+'Codigo'}/${codigo}`,
      {
        headers: this.headers
      },
    );
  }

  /**
    * Obtiene una persona
    * @param nombre identificador del procedimiento
    */
   getNombre(nombre: string){
    return this.http.get(
      `${this.apiURL+'Nombre'}/${nombre}`,
      {
        headers: this.headers
      },
    );
  }

  getProcedimientos(): Observable<Procedimiento[]> {
    let url=`${this.urlListarProcedimientos}listAllProcedimientos`;
    console.log(url);
    return this.http.get<Procedimiento[]>(`${this.urlListarProcedimientos}listAllProcedimientos`);
  }

  
}
