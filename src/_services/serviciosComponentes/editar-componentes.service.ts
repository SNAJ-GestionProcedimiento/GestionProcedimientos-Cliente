import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Agendamiento } from 'src/_models/agendamiento.models';

@Injectable({
  providedIn: 'root'
})
export class EditarComponentesService {
  private msgEditarCrearAgenda = new BehaviorSubject<boolean>(true);
  private msgEditarIdPac = new BehaviorSubject<string>('');
  private msgEditarIdAcu = new BehaviorSubject<string>('');
  private msgEditarIdProc = new BehaviorSubject<string>('');
  private msgEditarAgend = new BehaviorSubject<string>('');
  private msgEditarObs = new BehaviorSubject<string>('');

  public esCrear = this.msgEditarCrearAgenda.asObservable();
  public idPaciente = this.msgEditarIdPac.asObservable();
  public idAcudiente = this.msgEditarIdAcu.asObservable();
  public idProcedimiento = this.msgEditarIdProc.asObservable();
  public idAgendaProc = this.msgEditarAgend.asObservable();
  public observacion = this.msgEditarObs.asObservable();

  constructor() { }
  public cambiarEsCrear(esCrear:boolean):void{
    this.msgEditarCrearAgenda.next(esCrear);
  }

  public cambiarIdPac(idNuevo:string):void{
    this.msgEditarIdPac.next(idNuevo);
  }
  public cambiarIdAcu(idNuevo:string):void{
    this.msgEditarIdAcu.next(idNuevo);
  }
  public cambiarIdProc(idNuevo:string):void{
    this.msgEditarIdProc.next(idNuevo);
  }
  public cambiaridAgendaProc(idAgendaProc:string):void{
    this.msgEditarAgend.next(idAgendaProc);
  }
  public cambiarObservacion(observacion:string):void{
    this.msgEditarObs.next(observacion);
  }
}
