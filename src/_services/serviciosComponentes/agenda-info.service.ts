import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaInfoService {
  private mensajeAgenda = new BehaviorSubject<string>('En espera de un id');

  public idPaciente = this.mensajeAgenda.asObservable();

  constructor() { }

  public cambiarIdAgendaProc(msj:string):void{
    this.mensajeAgenda.next(msj);
  }
}
