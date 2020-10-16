import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SalaService extends HttpService{

  constructor(
    protected http: HttpClient
  ) { 
    super(http);
    this.apiURL += 'getProcedimiento'
  }
}
