import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../_services/http.service';
import { MaterialRequerido } from '../_models/material.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MaterialesService extends HttpService{
      constructor(protected http: HttpClient) { 
      super(http);
    }

    getMaterialesProcedimiento(idProcedimiento: number, idModalidad: number): Observable<MaterialRequerido[]>{
        return this.http.get<MaterialRequerido[]>(`${this.apiURL}getMaterialesProc/${idProcedimiento}/${idModalidad}`);
      }

}