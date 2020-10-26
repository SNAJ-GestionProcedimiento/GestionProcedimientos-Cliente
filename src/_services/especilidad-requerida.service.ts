import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { editarEpecialidadesRequeridas, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
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

  editarEspecialidad(especialista: editarEpecialidadesRequeridas): Observable<editarEpecialidadesRequeridas>{
    console.log(especialista.id);
    console.log(especialista.codigoEspecialidad);
    console.log(especialista.nombreEspecialidad);
    console.log(especialista.registroMedico);
    console.log(especialista.identificacion);
    console.log(especialista.nombreEspecialista);
    console.log(especialista.estado);
    console.log(especialista.idAgendaProcedimiento);
    console.log(JSON.stringify(especialista));
    return this.http.put<editarEpecialidadesRequeridas>(`${this.apiURL}editAgendaEspecialista`, JSON.stringify(especialista));
  }
}
