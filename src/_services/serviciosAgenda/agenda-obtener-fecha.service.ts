import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaObtenerFechaService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'getAgendaProcsConFecha';
  }

  /**
   * Obtenemos una agenda con id
   */
  get(fechaInicio:string,fechaFin:string){
    return this.http.get<any>(`${this.apiURL}/${fechaInicio}/${fechaFin}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      })
  }
}
