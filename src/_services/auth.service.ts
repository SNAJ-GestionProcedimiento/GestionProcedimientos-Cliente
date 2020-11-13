import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'login';
   }

   /**
    * Iniciar Sesión
    */
   login(usuario:string, contra:string){
    return this.http.post(`${this.apiURL}`,
      {
        username:usuario,
        password:contra
      },{
        headers:this.headers
      } );
   }
}
