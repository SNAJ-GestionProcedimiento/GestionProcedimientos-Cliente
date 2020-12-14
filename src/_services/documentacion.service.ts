import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../_services/http.service';
import { DocumentoRequerido, editarDocumentos, previsualizarDocumentos } from '../_models/documento.model';
import { Observable } from 'rxjs';


@Injectable()
export class DocumentoService extends HttpService{
    constructor(protected http: HttpClient) { 
    super(http);
  }

  token():HttpHeaders{
    //envio del heard token
    const httpHeaders = new HttpHeaders({
      'Authorization':  `Token ${localStorage.getItem('token')}`
    })
    
    return httpHeaders;
  }

  getDocumentoRequerido(idAgendaProcedimiento: number): Observable<DocumentoRequerido[]>{
    return this.http.get<DocumentoRequerido[]>(`${this.apiURL}listDocAdjunto/${idAgendaProcedimiento}`, { headers: this.token() });
  } 
  
  getDocumentosProcedimiento(idProcedimiento: number, idModalidad: number): Observable<DocumentoRequerido[]>{
    return this.http.get<DocumentoRequerido[]>(`${this.apiURL}getDocumentosProc/${idProcedimiento}/${idModalidad}`, { headers: this.token() });
  }

  editarDocumentoServicio(documentoEditado: FormData): Observable<editarDocumentos>{
    this.headers  = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.put<editarDocumentos>(`${this.apiURL}editDocumentoAdjunto`, documentoEditado, { headers: this.token() });

  }

  getAllDocumentos(): Observable<DocumentoRequerido[]>{
    return this.http.get<DocumentoRequerido[]>(`${this.apiURL}getAllDocumentos`, { headers: this.token() });

  }
 
  addDocumento(documentoEditado: editarDocumentos): Observable<editarDocumentos> { 
    return this.http.post<editarDocumentos>(`${this.apiURL}addDocumentoAdjunto`, documentoEditado, { headers: this.token()});
  }

  deleteDocumento(documentoElimId: number): Observable<any> {
    const url=this.apiURL+"deleteDocumentoAdjunto/"+documentoElimId.toString();
    return this.http.delete(`${url}`, { headers: this.token() });
  }

  getArchivoAdjunto(idDocumento: number): Observable<Blob>{
    const url = this.apiURL+"getArchivoAdjunto/"+idDocumento.toString();
    const options = {
      responseType: 'blob' as 'json',
      headers: this.token()
    };

    return this.http.get<any>((`${url}`),options);
  }

  generarAcuseRecibido(idAgendaProcedimiento: number): Observable<Blob>{
    const url=this.apiURL+"generateRecibido/"+idAgendaProcedimiento.toString();

    const options = {
      responseType: 'blob' as 'json',
      headers: this.token()
    };

    return this.http.get<any>((`${url}`),options);
  }
}
