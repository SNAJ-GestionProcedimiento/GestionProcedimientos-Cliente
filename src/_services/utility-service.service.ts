import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { InstrumentosEquipos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }

  private objIntrumento = new BehaviorSubject<InstrumentosEquipos>(null);
  private objEstados = new BehaviorSubject<estadoClass[]>(null);
  private objIdProcedimiento = new BehaviorSubject<string>("");

  public customInstrumento = this.objIntrumento.asObservable();
  public customEstados = this.objEstados.asObservable();
  public customIdProcedimiento = this.objIdProcedimiento.asObservable();

    public changeIntrumento(msg: InstrumentosEquipos): void {
      this.objIntrumento.next(msg);
    }
    public changeEstado(msg: estadoClass []): void {
      this.objEstados.next(msg);
    }
    public changeIdProcedimiento(msg: string): void {
      this.objIdProcedimiento.next(msg);
    }
}
