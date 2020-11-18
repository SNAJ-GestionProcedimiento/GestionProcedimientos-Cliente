import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioObtenerService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'listActiveUsers';
   }

   /**
    * Obtener la lista de usuarios
    */
   getUsers(){
    return this.http.get(`${this.apiURL}`,{
        headers:this.headers
      } );
   }
}
