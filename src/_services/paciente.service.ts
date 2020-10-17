import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable()
export class PacienteService  extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getPersonaIdentificacion';
   }

   /**
    * Obtiene una lista de personas
    * @param id identificador de la persona
    */
   get(id: string){
     return this.http.get(
       `${this.apiURL}/${id}`,
       {
         headers: this.headers
       },
     );
   }
}
