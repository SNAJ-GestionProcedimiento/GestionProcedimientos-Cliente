import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

import { AgendaCrear } from 'src/_models/agenda-crear.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaCrearService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
    this.apiURL += 'addAgendaProcedimiento';
  }

  /**
    * Crea una agenda y recibe muchos json 
    */
   create(agendaCrear: AgendaCrear){
    return this.http.post(
      `${this.apiURL}`,agendaCrear.parseToJSON(),
      { headers: this.headers  },
    );
  }
}
