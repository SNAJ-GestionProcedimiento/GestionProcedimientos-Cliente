import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Paciente } from '../_models/paciente.model';

@Injectable()
export class PacienteService  extends HttpService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiURL += 'getPersonaIdentificacion';
   }

   /**
    * Obtiene una persona
    * @param id identificador de la persona
    */
   get(id: string){
     console.log(id);
     return this.http.get(
       `${this.apiURL}/${id}`,
       {
         headers: this.headers
       },
     );
   }
}
