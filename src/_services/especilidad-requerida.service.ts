import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { editarEpecialidadesRequeridas, especialidadesPrevisualizar, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadRequeridaService extends HttpService {

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
 
  getEspecialidadRequerida(idAgendaProcedimiento: number): Observable<especialidadesRequeridas[]> {
    return this.http.get<especialidadesRequeridas[]>(`${this.apiURL}listAgendaEspecialistas/${idAgendaProcedimiento}`, { headers: this.token() });
  }

  editarEspecialidad(especialista: editarEpecialidadesRequeridas): Observable<editarEpecialidadesRequeridas> {
    return this.http.put<editarEpecialidadesRequeridas>(`${this.apiURL}editAgendaEspecialista`, JSON.stringify(especialista), { headers: this.token() });
  }

  getAllEspecialidades(): Observable<especialidadesPrevisualizar[]> {
    return this.http.get<especialidadesPrevisualizar[]>(`${this.apiURL}getAllEspecialidades`, { headers: this.token() });
  }

  addEspecialidad(instrumentEquipo: especialidadesPrevisualizar): Observable<especialidadesPrevisualizar> {
    return this.http.post<especialidadesPrevisualizar>(`${this.apiURL}addAgendaEspecialista`, instrumentEquipo, { headers: this.token() });
  }

  getEspecialidadesRequeridos(idAgendaProcedimiento: number, idModalidad: number): Observable<especialidadesRequeridas[]> {
    return this.http.get<especialidadesRequeridas[]>(`${this.apiURL}getEspecialidadesProc/${idAgendaProcedimiento}/${idModalidad}`, { headers: this.token() });
  }
  
  deleteEspecialidad(idEspecialidad: number): Observable<any> {
    return this.http.delete(`${this.apiURL}deleteAgendaEspecialista/${idEspecialidad}`, { headers: this.token() });
  }

}
