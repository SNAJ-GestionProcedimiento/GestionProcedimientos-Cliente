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
  private objIdProcedimientoModalidad = new BehaviorSubject<string>("");
  private objIdAgendaProcedimiento = new BehaviorSubject<number>(0);
  private objEspecialidad= new BehaviorSubject<especialidadesRequeridas>(null);
  private objEspecialidadAdd= new BehaviorSubject<especialidadesRequeridas>(null);
  private objIntrumentoAdd = new BehaviorSubject<InstrumentosEquipos[]>(null);
  private objIdModalidad = new BehaviorSubject<string>("");
  private objBanderaRequerido = new BehaviorSubject<Boolean>(false);
  private objBanderaBotonAnadir = new BehaviorSubject<Boolean>(false);

  public customInstrumento = this.objIntrumento.asObservable();
  public customEstados = this.objEstados.asObservable();
  public customIdProcedimiento = this.objIdProcedimiento.asObservable();
  public customIdAgendaProcedimiento = this.objIdAgendaProcedimiento.asObservable();
  public customIdProcedimientoModalidad = this.objIdProcedimientoModalidad.asObservable();
  public customEspecialidad = this.objEspecialidad.asObservable();
  public customEspecialidadAdd = this.objEspecialidadAdd.asObservable();
  public customInstrumentoAdd = this.objIntrumentoAdd.asObservable();
  public customIdModalidad = this.objIdModalidad.asObservable();
  public customBanderaRequerido = this.objBanderaRequerido.asObservable();
  public customBanderaBotonAnadir = this.objBanderaBotonAnadir.asObservable();

    public changeIntrumento(msg: InstrumentosEquipos): void {
      this.objIntrumento.next(msg);
    }
    public changeEstado(msg: estadoClass []): void {
      this.objEstados.next(msg);
    }
    public changeIdProcedimiento(msg: string): void {
      this.objIdProcedimiento.next(msg);
    }
    public changeIdAgendaProcedimiento(msg: number): void {
      this.objIdAgendaProcedimiento.next(msg);
    }
    public changeIdProcedimientoModalidad(msg: string): void {
      this.objIdProcedimientoModalidad.next(msg);
    }
    public changeEspecialidad(msg: especialidadesRequeridas): void {
      this.objEspecialidad.next(msg);
    }
    public changeEspecialidadAdd(msg: especialidadesRequeridas): void {
      this.objEspecialidadAdd.next(msg);
    }
    public changeIntrumentoAdd(msg: InstrumentosEquipos[]): void {
      this.objIntrumentoAdd.next(msg);
    }
    public changeIdModalidad(msg: string): void {
      this.objIdModalidad.next(msg);
    }
    public changeBanderaRequerido(msg: Boolean): void {
      this.objBanderaRequerido.next(msg);
    }
    public changeBanderaBotonAnadir(msg: Boolean): void {
      this.objBanderaBotonAnadir.next(msg);
    }
}
