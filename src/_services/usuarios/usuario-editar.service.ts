import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

import { Usuario } from 'src/_models/modelsLogin/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class UsuarioEditarService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'editUser';
   }

   /**
    * Editar usuario desde administrador
    */
   editUserAdmin(usuario:Usuario){
    return this.http.put(`${this.apiURL}Admin`,usuario,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
   }
   /**
    * Editar usuario desde usuario
    */
   editUserUser(usuario:Usuario){
    return this.http.put(`${this.apiURL}User`,usuario,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
   }
}
