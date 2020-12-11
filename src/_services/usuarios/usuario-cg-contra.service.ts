import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCgContraService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'changePassword';
   }

   /**
    * Cabiar contraseña desde usuario
    */
   changePassUser(claveAnterior:string,claveNueva:string){
    return this.http.put(`${this.apiURL}User`,{
      old_password: claveAnterior,
      new_password: claveNueva
    },{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
   }
}
