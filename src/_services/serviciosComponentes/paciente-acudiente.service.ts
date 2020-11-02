import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PacienteAcudienteService {
  private mensajePaciente = new BehaviorSubject<string>('En espera de un id');
  private mensajeAcudiente = new BehaviorSubject<string>('En espera de un id');

  public idPaciente = this.mensajePaciente.asObservable();
  public idAcudiente = this.mensajeAcudiente.asObservable();

  constructor() { }

  public cambiarIdPaciente(msj:string):void{
    this.mensajePaciente.next(msj);
  }

  public cambiarIdAcudiente(msj:string):void{
    this.mensajeAcudiente.next(msj);
  }
}
