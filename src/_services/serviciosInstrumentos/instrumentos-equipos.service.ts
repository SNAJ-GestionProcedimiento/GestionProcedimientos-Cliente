import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { editInstrumentosEquipos, InstrumentosEquipos } from '../../_models/modelInstrumento/instrumentos-equipos.model';
import { Observable } from 'rxjs';

@Injectable()
export class InstrumentosEquiposService extends HttpService{

  urlGeneral: string;
  constructor(protected http: HttpClient) { 
    super(http);
  }


  getInstrumentoEquipo(idAgendaProcedimiento: number): Observable<InstrumentosEquipos[]>{
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}listAgendaEquipo/${idAgendaProcedimiento}`);
  }

  editarInstrumentoEquipo(instrumentEquipo: editInstrumentosEquipos): Observable<editInstrumentosEquipos>{
    return this.http.put<editInstrumentosEquipos>(`${this.apiURL}editAgendaEquipo`, instrumentEquipo);
  }

  getAllIntrumentos(): Observable<InstrumentosEquipos[]>{
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}getAllEquipos`);
  }
}
