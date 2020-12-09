import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEliminarService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'deleteUser';
   }

   /**
    * Eliminar usuario
    */
   deleteUser(nomUsuario:string){
    return this.http.delete(`${this.apiURL}/${nomUsuario}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      } );
   }
}
