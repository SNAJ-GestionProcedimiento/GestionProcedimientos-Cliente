import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import config from '../config/config';

@Injectable()
export abstract class HttpService {
  protected apiURL: string;
  protected headers: HttpHeaders;

  constructor(protected http: HttpClient) {
    this.apiURL = config.apiUrl;
    this.headers = new HttpHeaders();
    this.headers.set('Content.Type','application/json');
   }
}
