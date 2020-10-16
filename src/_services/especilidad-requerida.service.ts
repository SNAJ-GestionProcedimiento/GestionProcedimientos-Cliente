import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadRequeridaService extends HttpService{

  constructor(protected http: HttpClient) { 
    super(http);
   }

   getEspecialidadRequerida(idAgendaProcedimiento: number): Observable<especialidadesRequeridas[]>{
    return this.http.get<especialidadesRequeridas[]>(`${this.apiURL}listAgendaEspecialistas/${idAgendaProcedimiento}`);
  }
}
