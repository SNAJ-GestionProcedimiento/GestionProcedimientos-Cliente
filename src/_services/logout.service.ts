import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'logout';
   }

   /**
    * Iniciar Sesión
    */
   logout(token:string){
    return this.http.post(`${this.apiURL}`,{},{
        headers:new HttpHeaders({
        'Authorization':  `Token ${token}`,
        })
      });
   }
}
