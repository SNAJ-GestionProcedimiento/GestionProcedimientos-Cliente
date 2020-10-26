import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService extends HttpService {

  constructor(
    protected http: HttpClient
  ) { 
    super(http);
    this.apiURL += 'getProcedimiento'
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
      `${this.apiURL+'getEstadosSalas'}`,
      {
        headers: this.headers
      },
    );
  }
}
