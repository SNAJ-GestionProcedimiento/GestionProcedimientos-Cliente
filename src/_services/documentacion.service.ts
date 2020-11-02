import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../_services/http.service';
import { DocumentoRequerido } from '../_models/documento.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends HttpService{
    constructor(protected http: HttpClient) { 
    super(http);
  }

  getDocumentoRequerido(idAgendaProcedimiento: number): Observable<DocumentoRequerido[]>{
    return this.http.get<DocumentoRequerido[]>(`${this.apiURL}listDocAdjunto/${idAgendaProcedimiento}`);
      /*return this.http.get<DocumentoRequerido[]>(`${this.apiURL}getDocumentosProc/${idProcedimiento}/${idModalidad}`);*/
  } 
  
  getDocumentosProcedimiento(idProcedimiento: number, idModalidad: number): Observable<DocumentoRequerido[]>{
    return this.http.get<DocumentoRequerido[]>(`${this.apiURL}getDocumentosProc/${idProcedimiento}/${idModalidad}`);
  }
 
}
