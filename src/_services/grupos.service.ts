import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GruposService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getGroups';
   }

   /**
    * Obtener grupos
    */
   getGrupos(){
    return this.http.get(`${this.apiURL}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
   }
}
