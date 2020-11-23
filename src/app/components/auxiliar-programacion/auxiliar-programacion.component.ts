import { Component, OnInit, ViewChild } from '@angular/core';


import { ProcedimientoComponent } from '../procedimiento/procedimiento.component';
import { PacienteComponent } from 'src/app/components/paciente/paciente.component';
import { AcudienteComponent } from 'src/app/components/acudiente/acudiente.component';
import { HoraFechaComponent } from 'src/app/components/hora-fecha/hora-fecha.component';
import { AgendaCrear } from 'src/_models/agenda-crear.model';
import { AgendaCrearService } from 'src/_services/agenda-crear.service';
import {AuxiliarDocumentacionComponent} from '../../components/auxiliar-documentacion/auxiliar-documentacion.component';
import {AuxiliarMaterialesComponent} from '../../components/auxiliar-materiales/auxiliar-materiales.component' 

import { AuxiliarInstrumentosEquiposComponent } from '../auxiliar-Equipos/auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { AuxiliarEspecialistaComponent } from '../auxiliar-especialidad/auxiliar-especialista/auxiliar-especialista.component';


@Component({
  selector: 'app-auxiliar-programacion',
  templateUrl: './auxiliar-programacion.component.html',
  styleUrls: ['./auxiliar-programacion.component.css']
})
export class AuxiliarProgramacionComponent implements OnInit {
  
  @ViewChild(AuxiliarInstrumentosEquiposComponent) listarInstrumentos: AuxiliarInstrumentosEquiposComponent;
  @ViewChild(AuxiliarEspecialistaComponent) listarEspecialidad: AuxiliarEspecialistaComponent;
  @ViewChild(AuxiliarDocumentacionComponent) listarDocumentos: AuxiliarDocumentacionComponent; 
  @ViewChild(AuxiliarMaterialesComponent) listarMateriales: AuxiliarMaterialesComponent;
  @ViewChild(ProcedimientoComponent) procedimientoCmp: ProcedimientoComponent;
  @ViewChild(PacienteComponent) pacienteCmp: PacienteComponent;
  @ViewChild(AcudienteComponent) acudienteCmp: AcudienteComponent;
  @ViewChild(HoraFechaComponent) horaFechaCmp: HoraFechaComponent;

  public agendaNueva : AgendaCrear;

  public idProcedimientoInstrumento: string;  //variable para obtener el id del procedimiento
  public edadPaciente:number;
  public activoAcudiente:boolean; 
  message:boolean;
  public codigoProcedimiento:string='';
  idProcedimiento: string;
  idAgendaProcedimiento: number;

  constructor(
    private agendaCrearService:AgendaCrearService, private utilityService: UtilityServiceService
  ) { }

  receiveMessage($event) {
    this.message = $event
    //console.log($event);
  }

  ngOnInit(): void {
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento=msg);
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento=msg)
  }

  listarInstrumentosDesdeProgramacion(){
    this.listarInstrumentos.listarIntrumentEquip();
    this.listarEspecialidad.listarEspecialidades();
  }

  listarDocumentosDesdeProgramacion(){
    //this.listarDocumentos.listarDocumentosRequeridos();
    //this.listarDocumentos.listarDocumentosPorCodigoModalidad();
    this.listarDocumentos.listarDocumentos();
  }

  listarMaterialesDesdeProgramacion(){
    //this.listarMateriales.listarMaterialesPorCodigoModalidad();
    this.listarMateriales.listarMateriales();
  }

  crearAgendaonClick(){

    
    this.codigoProcedimiento=this.procedimientoCmp.getCodigoProcedimiento();
    this.utilityService.changeIdProcedimiento(this.codigoProcedimiento);
    //this.listarInstrumentosDesdeProgramacion();
    //console.log("desde metodo crear, el codigo es: "+this.codigoProcedimiento);
    /**Captura de campos */
    
    let paciente = this.pacienteCmp.getObjPaciente();
    let observacion = this.pacienteCmp.getObservacion();
    let acudiente = this.acudienteCmp.getObjAcudiente();
    let proceModalidad = this.procedimientoCmp.getObjProcedimientoModalidad();
    let estadoCama = this.procedimientoCmp.getestadoCama();
    let hora = this.horaFechaCmp.getElemento('hora');
    let fecha = this.horaFechaCmp.getElemento('fecha');
    let estadoAgenda = this.horaFechaCmp.getElemento('estado');
    let estadoSala = this.horaFechaCmp.getElemento('estadoSala');
    let salaId = this.horaFechaCmp.getElemento('salaId');

    //console.log("El de la sala desde aux program: "+estadoSala);
  
    /**Creacion del modelo */
    let agenda:AgendaCrear = new AgendaCrear(paciente,acudiente,proceModalidad,fecha,hora,estadoCama,estadoAgenda,observacion, estadoSala,salaId,'1');

    this.crearAgenda(agenda);
    this.listarInstrumentosDesdeProgramacion();
    this.listarDocumentosDesdeProgramacion();
    this.listarMaterialesDesdeProgramacion();
    
    
  }

  /**Peticiones */
  public async crearAgenda(agenda:AgendaCrear){
    let res:any = await this.agendaCrearService.create(agenda).toPromise();
    this.idAgendaProcedimiento=res.idAgendaProcedimiento;
    this.utilityService.changeIdAgendaProcedimiento(this.idAgendaProcedimiento);
    console.log("idAgenda: "+this.idAgendaProcedimiento);
    this.listarInstrumentosDesdeProgramacion();
    this.listarDocumentosDesdeProgramacion();
    this.listarMaterialesDesdeProgramacion();

  }

}
