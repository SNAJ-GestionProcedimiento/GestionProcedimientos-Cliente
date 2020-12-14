import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTokenService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getUser';
   }

   /**
    * Obtener grupo de usuario
    */
   getUser(userName:string){
    return this.http.get(`${this.apiURL}/${userName}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
   }
}
