import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioIdObtenerService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getUserConId';
   }

   /**
    * Obtener grupo de usuario
    */
   getUser(userId:string){
    return this.http.get(`${this.apiURL}/${userId}`,{
        headers:this.headers
      } );
   }
}
