import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaObtenerService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'getAgendaProcConId';
  }

  /**
   * Obtenemos una agenda con id
   */
  get(idAgendaProc:string){
    return this.http.get<any>(`${this.apiURL}/${idAgendaProc}`,
    {
      headers: this.headers
    })
  }
}
