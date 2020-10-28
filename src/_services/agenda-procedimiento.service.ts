import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

import { AgendaCrear } from 'src/_models/agenda-crear.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaProcedimientoService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += '';
  }

  /**
    * Crea una agenda y recibe muchos json 
    */
   create(agendaCrear: AgendaCrear){
    this.apiURL += 'addAgendaProcedimiento';
    return this.http.post<any>(
      `${this.apiURL}`,agendaCrear.parseToJSON(),
      { headers: this.headers },
    );
  }

  /**
   * Obtiene el procedimiento agendado con el id
   */
  get(idAgendaProc:string){
    this.apiURL += 'getAgendaProcConId';
    return this.http.get<any>(`${this.apiURL}/${idAgendaProc}`,
    {
      headers: this.headers
    })
  }

  /**
   * Lista los procedimientos agendados
   */
  list(){
    this.apiURL += 'listAgendaProcedimiento';
    return this.http.get<any>(`${this.apiURL}`,
    {
      headers: this.headers
    })
  }

}
