import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGrupoService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getUserGroupWithToken';
   }

   /**
    * Obtener grupo de usuario
    */
   getGroup(token:string){
    return this.http.get(`${this.apiURL}`,{
        headers:new HttpHeaders({
          'Authorization':  `Token ${token}`,
        })
      } );
   }
}
