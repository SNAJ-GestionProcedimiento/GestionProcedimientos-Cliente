import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

import { AgendaEditar } from 'src/_models/models_Agenda/agenda-editar.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaEditarService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'editAgendaProcedimiento';
  }

  /**
    * Crea una agenda y recibe muchos json 
    */
   update(agendaEditar: AgendaEditar){
    return this.http.put<any>(
      `${this.apiURL}`,agendaEditar.parseToJSON(),
      { headers: this.headers },
    );
  }
}
