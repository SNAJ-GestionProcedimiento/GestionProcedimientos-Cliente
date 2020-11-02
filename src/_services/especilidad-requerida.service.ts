import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  
  deleteEspecialidad(idEspecialidad: number): Observable<any> {
    return this.http.delete(`${this.apiURL}deleteAgendaEspecialista/${idEspecialidad}`);
  }

}

    /*.pipe(
      catchError(error=>{
        let errorMensaje='';
        if (error instanceof ErrorEvent){
          //error en el cliente
          errorMensaje=`Client-side error: ${error.error.message}`;
        }else{
          //error del back
          errorMensaje=`Server-side error: ${error.status} ${error.message}`;
        }

        //mensaje fijo en la pantalla
        console.log("error del back: "+errorMensaje);
        return throwError(errorMensaje);
      })
    )*/