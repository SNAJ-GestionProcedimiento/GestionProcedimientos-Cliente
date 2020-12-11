import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';
import { editInstrumentosEquipos, InstrumentosEquipos } from '../../_models/modelInstrumento/instrumentos-equipos.model';
import { Observable } from 'rxjs';

@Injectable()
export class InstrumentosEquiposService extends HttpService {

  urlGeneral: string;
  constructor(protected http: HttpClient) {
    super(http);
  }

  token():HttpHeaders{
    //envio del heard token
    const httpHeaders = new HttpHeaders({
      'Authorization':  `Token ${localStorage.getItem('token')}`,
    });
    return httpHeaders;
  }
 
  getInstrumentoEquipo(idAgendaProcedimiento: number): Observable<InstrumentosEquipos[]> {
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}listAgendaEquipo/${idAgendaProcedimiento}`, { headers: this.token() });
  }

  editarInstrumentoEquipo(instrumentEquipo: editInstrumentosEquipos): Observable<editInstrumentosEquipos> {
    return this.http.put<editInstrumentosEquipos>(`${this.apiURL}editAgendaEquipo`, instrumentEquipo, { headers: this.token() }); 
  }

  getAllIntrumentos(): Observable<InstrumentosEquipos[]> {
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}getAllEquipos`, { headers: this.token() });
  }

  addInstrumento(instrumentEquipo: editInstrumentosEquipos): Observable<editInstrumentosEquipos> {
    return this.http.post<editInstrumentosEquipos>(`${this.apiURL}addAgendaEquipo`, instrumentEquipo, { headers: this.token() });
  }

  getInstrumentosRequeridos(codigoProcedimiento: number, idModalidad: number): Observable<InstrumentosEquipos[]> {
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}getEquiposProc/${codigoProcedimiento}/${idModalidad}`, { headers: this.token() });
  }

  deleteInstrumento(instrumentEquipo: number): Observable<any> {
    const url=this.apiURL+"deleteAgendaEquipo/"+instrumentEquipo.toString();
    return this.http.delete(`${url}`, { headers: this.token() });
  }

}
