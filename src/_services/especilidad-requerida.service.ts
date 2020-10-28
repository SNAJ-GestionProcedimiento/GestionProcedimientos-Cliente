import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { editarEpecialidadesRequeridas, especialidadesPrevisualizar, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadRequeridaService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getEspecialidadRequerida(idAgendaProcedimiento: number): Observable<especialidadesRequeridas[]> {
    return this.http.get<especialidadesRequeridas[]>(`${this.apiURL}listAgendaEspecialistas/${idAgendaProcedimiento}`);
  }

  editarEspecialidad(especialista: editarEpecialidadesRequeridas): Observable<editarEpecialidadesRequeridas> {
    return this.http.put<editarEpecialidadesRequeridas>(`${this.apiURL}editAgendaEspecialista`, JSON.stringify(especialista));
  }

  getAllEspecialidades(): Observable<especialidadesPrevisualizar[]> {
    return this.http.get<especialidadesPrevisualizar[]>(`${this.apiURL}getAllEspecialidades`);
  }

  addEspecialidad(instrumentEquipo: especialidadesPrevisualizar): Observable<especialidadesPrevisualizar> {
    return this.http.post<especialidadesPrevisualizar>(`${this.apiURL}addAgendaEspecialista`, instrumentEquipo);
  }

  getEspecialidadesRequeridos(idAgendaProcedimiento: number, idModalidad: number): Observable<especialidadesRequeridas[]> {
    return this.http.get<especialidadesRequeridas[]>(`${this.apiURL}getEspecialidadesProc/${idAgendaProcedimiento}/${idModalidad}`);
  }
  
  deleteInstrumento(idEspecialidad: number): Observable<any> {
    return this.http.delete(`${this.apiURL}deleteAgendaEspecialista/${idEspecialidad}`);
  }

}
