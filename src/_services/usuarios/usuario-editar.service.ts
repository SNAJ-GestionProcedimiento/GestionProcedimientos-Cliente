import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

import { Usuario } from 'src/_models/modelsLogin/usuario.model'

@Injectable({
  providedIn: 'root'
})
export class UsuarioEditarService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'editUserAdmin';
   }

   /**
    * Editar usuario
    */
   editUser(usuario:Usuario){
    return this.http.put(`${this.apiURL}`,usuario,{
        headers:this.headers
      } );
   }
}
