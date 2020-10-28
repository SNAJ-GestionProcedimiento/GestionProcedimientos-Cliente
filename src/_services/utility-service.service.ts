import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
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
  private objEspecialidad= new BehaviorSubject<especialidadesRequeridas>(null);
  private objIntrumentoAdd = new BehaviorSubject<InstrumentosEquipos[]>(null);
  private objIdModalidad = new BehaviorSubject<string>("");

  public customInstrumento = this.objIntrumento.asObservable();
  public customEstados = this.objEstados.asObservable();
  public customIdProcedimiento = this.objIdProcedimiento.asObservable();
  public customEspecialidad = this.objEspecialidad.asObservable();
  public customInstrumentoAdd = this.objIntrumentoAdd.asObservable();
  public customIdModalidad = this.objIdModalidad.asObservable();

    public changeIntrumento(msg: InstrumentosEquipos): void {
      this.objIntrumento.next(msg);
    }
    public changeEstado(msg: estadoClass []): void {
      this.objEstados.next(msg);
    }
    public changeIdProcedimiento(msg: string): void {
      this.objIdProcedimiento.next(msg);
    }
    public changeEspecialidad(msg: especialidadesRequeridas): void {
      this.objEspecialidad.next(msg);
    }
    public changeIntrumentoAdd(msg: InstrumentosEquipos[]): void {
      this.objIntrumentoAdd.next(msg);
    }
    public changeIdModalidad(msg: string): void {
      this.objIdModalidad.next(msg);
    }
}
