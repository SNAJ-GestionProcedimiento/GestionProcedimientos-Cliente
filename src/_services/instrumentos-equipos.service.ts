import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { InstrumentosEquipos } from '../_models/instrumentos-equipos.model';
import { Observable } from 'rxjs';

@Injectable()
export class InstrumentosEquiposService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'getEquiposProc';
  }

  get(idAgendaProcedimiento: number, id: number){
    return this.http.get(
      `${this.apiURL}/${idAgendaProcedimiento}/${id}`,
      {
        headers: this.headers
      },
    );
  }

  getInstrumentoEquipo(idAgendaProcedimiento: number, id: number): Observable<InstrumentosEquipos[]>{
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}/${idAgendaProcedimiento}/${id}`);
  }
}
