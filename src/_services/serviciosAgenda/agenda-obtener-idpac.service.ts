import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaObtenerIdpacService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'getAgendaProcsConIdenPac';
  }
  /**
   * Obtenemos una agenda con id de paciente
   */
  get(idPaciente:string){
    return this.http.get<any>(`${this.apiURL}/${idPaciente}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      })
  }
}
