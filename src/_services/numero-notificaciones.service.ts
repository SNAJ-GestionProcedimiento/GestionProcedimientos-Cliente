import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumeroNotificacionesService {

  constructor() { }

  private objNumeroNotificaciones = new BehaviorSubject<number>(0);
  private objBandera = new BehaviorSubject<number>(0);

  public customNumeroNotificaciones = this.objNumeroNotificaciones.asObservable();
  public customBandera = this.objBandera.asObservable();

  public changeNumeroNotificacion(msg: number): void {
    this.objNumeroNotificaciones.next(msg);
  }
  public changeBandera(msg: number): void {
    this.objBandera.next(msg);
  }
}
