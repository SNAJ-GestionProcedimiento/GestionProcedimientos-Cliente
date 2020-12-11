import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../_services/http.service';
import { MaterialRequerido, editarMateriales } from '../_models/material.model';
import { Observable } from 'rxjs';
import { editarDocumentos } from '../_models/documento.model';

@Injectable({
    providedIn: 'root'
  })  
  export class MaterialesService extends HttpService{
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

    getMaterialRequerido(idAgendaProcedimiento: number): Observable<MaterialRequerido[]>{
      return this.http.get<MaterialRequerido[]>(`${this.apiURL}listAgendaMaterial/${idAgendaProcedimiento}`, { headers: this.token() }); 
    }

    getMaterialesProcedimiento(idProcedimiento: number, idModalidad: number): Observable<MaterialRequerido[]>{
        return this.http.get<MaterialRequerido[]>(`${this.apiURL}getMaterialesProc/${idProcedimiento}/${idModalidad}`, { headers: this.token() });
    }

    editAgendaMaterial(materialEditado: editarMateriales): Observable<editarMateriales> {
      return this.http.put<editarMateriales>(`${this.apiURL}editAgendaMaterial`, materialEditado, { headers: this.token() }); 
    }

    getAllMateriales(): Observable<MaterialRequerido[]> {
      return this.http.get<MaterialRequerido[]>(`${this.apiURL}getAllMateriales`, { headers: this.token() });
    }
  
    addMaterial(materialAdd: editarMateriales): Observable<editarMateriales> {
      return this.http.post<editarMateriales>(`${this.apiURL}addAgendaMaterial`, materialAdd, { headers: this.token() });
    }

    deleteMaterial(idAgendaMaterial: number): Observable<any> {
      const url=this.apiURL+"deleteAgendaMaterial/"+idAgendaMaterial.toString();
      return this.http.delete(`${url}`, { headers: this.token() });
    }




}