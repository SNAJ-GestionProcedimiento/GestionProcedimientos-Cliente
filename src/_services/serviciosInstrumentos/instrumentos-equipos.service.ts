import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';
import { editInstrumentosEquipos, InstrumentosEquipos } from '../../_models/modelInstrumento/instrumentos-equipos.model';
import { Observable } from 'rxjs';
import { InstrumentosEquiposEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';

@Injectable()
export class InstrumentosEquiposService extends HttpService{

  urlGeneral: string;
  constructor(protected http: HttpClient) { 
    super(http);
    /*this.urlGeneral=this.apiURL;
    this.apiURL += 'listAgendaEquipo';
    this.urlGeneral+='editAgendaEquipo';*/
  }


  getInstrumentoEquipo(idAgendaProcedimiento: number): Observable<InstrumentosEquipos[]>{
    return this.http.get<InstrumentosEquipos[]>(`${this.apiURL}listAgendaEquipo/${idAgendaProcedimiento}`);
  }

  editarInstrumentoEquipo(instrumentEquipo: editInstrumentosEquipos): Observable<editInstrumentosEquipos>{
    console.log("desde servicio: "+instrumentEquipo);
    return this.http.put<editInstrumentosEquipos>(`${this.apiURL}editAgendaEquipo`, instrumentEquipo);
  }

  getEstados(): Observable<InstrumentosEquiposEstado[]>{
    return this.http.get<InstrumentosEquiposEstado[]>(`${this.apiURL}getEstadosAgendaProc`);
  }
}
