import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http.service';

import { Usuario } from 'src/_models/modelsLogin/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCrearService extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'addUser';
   }

   /**
    * Crear usuario
    */
   addUser(usuario:Usuario){
    return this.http.post(`${this.apiURL}`,usuario,{
        headers:this.headers
      } );
   }
}
