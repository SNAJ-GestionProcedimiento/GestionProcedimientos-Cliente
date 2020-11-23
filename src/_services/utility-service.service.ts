import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { InstrumentosEquipos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';
import {DocumentoRequerido} from '../_models/documento.model'
import { estadoDocClass } from '../_models/documento-estado.model';
import { MaterialRequerido } from '../_models/material.model';
import { estadoMatClass } from 'src/_models/materiales-estado.model';

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
  private objEspecialidad= new BehaviorSubject<especialidadesRequeridas>
  (null);
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
  
  //Inicio Documentos

  private objDocumento = new BehaviorSubject<DocumentoRequerido>(null); 
  private objEstadosDoc = new BehaviorSubject<estadoDocClass[]>(null);
  private objDocumentoAdd = new BehaviorSubject<DocumentoRequerido[]>(null);



  //Fin Documento

  //Inicio materiales

  private objMateriales = new BehaviorSubject<MaterialRequerido>(null);
  private objEstadoMat = new BehaviorSubject<estadoMatClass[]>(null);
  private objMaterialAdd = new BehaviorSubject<MaterialRequerido[]>(null);
  public customMaterial = this.objMateriales.asObservable();
  public customEstadosMat = this.objEstadoMat.asObservable();
  public customMaterialAdd = this.objMaterialAdd.asObservable();
  public customEstadosDoc = this.objEstadosDoc.asObservable();
  public customDocumentoAdd = this.objDocumentoAdd.asObservable();
  public customDocumento = this.objDocumento.asObservable();

  //Fin materiales 

  public changeMaterial(msg: MaterialRequerido): void{
    this.objMateriales.next(msg);
  }
  public changeEstadoMaterial(msg: estadoMatClass []): void {
    this.objEstadoMat.next(msg);
  }
  public changeMaterialAdd(msg: MaterialRequerido[]): void {
    this.objMaterialAdd.next(msg);
  }
  public changeDocumento(msg: DocumentoRequerido): void{
    this.objDocumento.next(msg);
  }
  public changeEstadoDocumento(msg: estadoDocClass []): void {
    this.objEstadosDoc.next(msg);
  }
  public changeDocumentoAdd(msg: DocumentoRequerido[]): void {
    this.objDocumentoAdd.next(msg);
  }
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
