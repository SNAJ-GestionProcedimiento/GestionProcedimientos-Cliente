import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService extends HttpService{

  constructor(
    protected http: HttpClient
  ) { 
    super(http);
    this.apiURL += 'getAllSalas';
  }

  /**
    * Obtiene todas las salas
  */
 list(){
   return this.http.get(
    `${this.apiURL}`,{
      headers:new HttpHeaders({
        'Authorization':  `Token ${localStorage.getItem('token')}`,
      })
      });
 }
}
