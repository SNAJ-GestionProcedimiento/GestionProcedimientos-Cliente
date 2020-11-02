import { Component, OnInit, ViewChild } from '@angular/core';


import { ProcedimientoComponent } from '../procedimiento/procedimiento.component';
import { PacienteComponent } from 'src/app/components/paciente/paciente.component';
import { AcudienteComponent } from 'src/app/components/acudiente/acudiente.component';
import { HoraFechaComponent } from 'src/app/components/hora-fecha/hora-fecha.component';
import { AgendaCrear } from 'src/_models/models_Agenda/agenda-crear.model';
import { AgendaCrearService } from 'src/_services/serviciosAgenda/agenda-crear.service';
import {AuxiliarDocumentacionComponent} from '../auxiliar-documentacion/auxiliar-documentacion.component';

import { AuxiliarInstrumentosEquiposComponent } from '../auxiliar-Equipos/auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { AuxiliarEspecialistaComponent } from '../auxiliar-especialidad/auxiliar-especialista/auxiliar-especialista.component';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';

@Component({
  selector: 'app-auxiliar-crear-programacion',
  templateUrl: './auxiliar-programacion.component.html',
  styleUrls: ['./auxiliar-programacion.component.css']
})
export class AuxiliarCrearProgramacionComponent implements OnInit {
  
  @ViewChild(AuxiliarInstrumentosEquiposComponent) listarInstrumentos: AuxiliarInstrumentosEquiposComponent;
  @ViewChild(AuxiliarEspecialistaComponent) listarEspecialidad: AuxiliarEspecialistaComponent;
  @ViewChild(AuxiliarDocumentacionComponent) listarDocumentos: AuxiliarDocumentacionComponent; 
  @ViewChild(ProcedimientoComponent) procedimientoCmp: ProcedimientoComponent;
  @ViewChild(PacienteComponent) pacienteCmp: PacienteComponent;
  @ViewChild(AcudienteComponent) acudienteCmp: AcudienteComponent;
  @ViewChild(HoraFechaComponent) horaFechaCmp: HoraFechaComponent;

  /**Variables de reinicio de los componentes */
  public RcodigoProcedimiento:string='';
  public RidPacienteAgendado:string='';
  public RidAcudienteAgendado:string='';
  public RidAgendaProcedimiento:string='';
  public Robservacion:string='';
  //** */

  public agendaNueva : AgendaCrear;

  public idProcedimientoInstrumento: string;  //variable para obtener el id del procedimiento
  public edadPaciente:number;
  public activoAcudiente:boolean; 
  public message:boolean;
  public codigoProcedimiento:string='';
  public idProcedimiento: string;
  public idAgendaProcedimiento: number;

  public iniciarComp:boolean=true;

  constructor(
    private agendaCrearService:AgendaCrearService, 
    private utilityService: UtilityServiceService,
    private editarComponentesService:EditarComponentesService
  ) { }

  receiveMessage($event) {
    this.message = $event
    //console.log($event);
  }

  ngOnInit(): void {
    this.actualizarIds();
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento=msg);
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento=msg)
  } 

  listarInstrumentosDesdeProgramacion(){
    this.listarInstrumentos.listarIntrumentEquip();
    this.listarEspecialidad.listarEspecialidades();
  }

  listarDocumentosDesdeProgramacion(){
    this.listarDocumentos.listarDocumentosRequeridos();
    this.listarDocumentos.listarDocumentosPorCodigoModalidad();
  }

  crearAgendaonClick(){
    /**Actualiza el codigo de procedimiento de las tablas */
    this.codigoProcedimiento=this.procedimientoCmp.getCodigoProcedimiento();
    this.utilityService.changeIdProcedimiento(this.codigoProcedimiento);
    /**Captura de campos */
    let paciente = this.pacienteCmp.getObjPaciente();
    let observacion = this.pacienteCmp.getObservacion();
    let acudiente = this.acudienteCmp.getObjAcudiente();
    let procedimiento = this.procedimientoCmp.getObjProcedimiento();
    let estadoCama = this.procedimientoCmp.getestadoCama();
    let agendamiento = this.horaFechaCmp.getAgendamiento();
  
    /**Creacion del modelo */
    let agenda:AgendaCrear = AgendaCrear.fromOBJECTS(paciente,acudiente,procedimiento,agendamiento,observacion,estadoCama,'1');

    console.log(agenda.parseToJSON());
    this.crearAgenda(agenda);
    
  }

  /**Peticiones */
  public async crearAgenda(agenda:AgendaCrear){
    let res:any = await this.agendaCrearService.create(agenda).toPromise();
    if(res!=null){
      console.log(res);
      this.codigoProcedimiento=this.procedimientoCmp.getCodigoProcedimiento();
      this.listarInstrumentosDesdeProgramacion();
    }
  }

  /**Envios */
  public actualizarIds(){
    this.editarComponentesService.cambiarIdPac(this.RidPacienteAgendado);
    this.editarComponentesService.cambiarIdAcu(this.RidAcudienteAgendado);
    this.editarComponentesService.cambiarIdProc(this.RcodigoProcedimiento);
    this.editarComponentesService.cambiaridAgendaProc(this.RidAgendaProcedimiento);
    this.editarComponentesService.cambiarObservacion(this.Robservacion);
  }
}
