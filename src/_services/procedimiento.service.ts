import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { Observable, throwError } from 'rxjs';
import { Modalidad } from 'src/_models/modalidad.model';
import { catchError } from 'rxjs/operators';
import { CrearProcedimientoAdmin } from 'src/_models/procedimientoCrearAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedimientoService extends HttpService {

  urlListarProcedimientos: String;
  constructor(
    protected http: HttpClient
  ) {
    super(http);
    this.urlListarProcedimientos = this.apiURL;
    this.apiURL += 'getProcedimiento';
  }

  /**
    * Obtiene una persona
    * @param codigo identificador del procedimiento
    */
  getCodigo(codigo: string) {
    return this.http.get(
      `${this.apiURL + 'Codigo'}/${codigo}`,{
        headers:new HttpHeaders({
          'Authorization':  `Token ${localStorage.getItem('token')}`,
        })
        });
  }

  /**
    * Obtiene una persona
    * @param nombre identificador del procedimiento
    */
  getNombre(nombre: string) {
    return this.http.get(
      `${this.apiURL + 'Nombre'}/${nombre}`,{
        headers:new HttpHeaders({
          'Authorization':  `Token ${localStorage.getItem('token')}`,
        })
        });
  }

  getProcedimientos(): Observable<Procedimiento[]> {
    //let url=`${this.urlListarProcedimientos}listAllProcedimientos`;
    //console.log(url);
    return this.http.get<Procedimiento[]>(`${this.urlListarProcedimientos}listAllProcedimientos`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
  }

  getModidalidades(): Observable<Modalidad[]> {
    //let url=`${this.urlListarProcedimientos}listAllModalidades`;
    //console.log(url);
    return this.http.get<Modalidad[]>(`${this.urlListarProcedimientos}listAllModalidades`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
  }

  existeNombreProc(nombre: String): Observable<Modalidad[]> {
    //let url=`${this.urlListarProcedimientos}listAllModalidades`;
    //console.log(url);
    return this.http.get<Modalidad[]>(`${this.urlListarProcedimientos}getProcedimientoNombreIgual/${nombre}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      }).pipe(
      catchError(
        e=>{
          if(e.status==500){
            return throwError(e);
          };
        }
      )
    );
  }

  crearProcedimiento(procedimiento: CrearProcedimientoAdmin):Observable<CrearProcedimientoAdmin> {
    return this.http.post<CrearProcedimientoAdmin>(`${this.urlListarProcedimientos}addProcedimiento`, procedimiento,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
  }

  eliminarProcedimiento(cod: String):Observable<any> {
    return this.http.delete<any>(`${this.urlListarProcedimientos}deleteProcedimiento/${cod}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
  }
}
