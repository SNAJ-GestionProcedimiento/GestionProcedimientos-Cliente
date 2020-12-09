import { Component, OnInit,ViewChild } from '@angular/core';

import { ProcedimientoComponent } from '../procedimiento/procedimiento.component';
import { PacienteComponent } from 'src/app/components/paciente/paciente.component';
import { AcudienteComponent } from 'src/app/components/acudiente/acudiente.component';
import { HoraFechaComponent } from 'src/app/components/hora-fecha/hora-fecha.component';
import {AuxiliarDocumentacionComponent} from '../auxiliar-documentacion/auxiliar-documentacion.component';
import { AuxiliarInstrumentosEquiposComponent } from '../auxiliar-Equipos/auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { AuxiliarEspecialistaComponent } from '../auxiliar-especialidad/auxiliar-especialista/auxiliar-especialista.component';

import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';
import { AgendaEditarService } from 'src/_services/serviciosAgenda/agenda-editar.service';

import { ProcedimientoAgenda } from 'src/_models/models_Agenda/procedimiento-agenda.model';
import { Paciente } from 'src/_models/paciente.model';
import { Acudiente } from 'src/_models/acudiente.model';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { Router } from '@angular/router';
import { Agendamiento } from 'src/_models/agendamiento.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendaEditar } from 'src/_models/models_Agenda/agenda-editar.model';
import { UtilityServiceService } from 'src/_services/utility-service.service';

@Component({
  selector: 'app-auxiliar-editar-programacion',
  templateUrl: './auxiliar-editar-programacion.component.html',
  styleUrls: ['./auxiliar-editar-programacion.component.css']
})
export class AuxiliarEditarProgramacionComponent implements OnInit {
  /** Comunicacion con los componentes hijos */
  @ViewChild(AuxiliarInstrumentosEquiposComponent) listarInstrumentos: AuxiliarInstrumentosEquiposComponent;
  @ViewChild(AuxiliarEspecialistaComponent) listarEspecialidad: AuxiliarEspecialistaComponent;
  @ViewChild(AuxiliarDocumentacionComponent) listarDocumentos: AuxiliarDocumentacionComponent; 
  @ViewChild(ProcedimientoComponent) procedimientoCmp: ProcedimientoComponent;
  @ViewChild(PacienteComponent) pacienteCmp: PacienteComponent;
  @ViewChild(AcudienteComponent) acudienteCmp: AcudienteComponent;
  @ViewChild(HoraFechaComponent) horaFechaCmp: HoraFechaComponent;

  public codigoProcedimiento:string='';
  public idPacienteAgendado:string='';
  public idAcudienteAgendado:string='';
  public idAgendaProcedimiento:string='';
  public observacion:string='';

  public banderaRequerido:Boolean;

  /**Elemento recibido desde ver agendamiento */
  public static recibido:ProcedimientoAgenda = new ProcedimientoAgenda();
  public static idModalidad:number = 0;

  /**Elementos para la pagina editar */
  public agendamiento:Agendamiento;
  public paciente:Paciente;
  public acudiente:Acudiente;
  public procedimiento:Procedimiento;


  constructor(
    private router:Router,
    private editarComponentesService:EditarComponentesService,
    private snackBar: MatSnackBar,
    private agendaEditarService:AgendaEditarService,
    private utilityService: UtilityServiceService,
    ) { }

  ngOnInit(): void {
    if(AuxiliarEditarProgramacionComponent.recibido.idAgendaProcedimiento==null){
      this.openSnackBar('No ha seleccionado Elemento a ','EDITAR');
      this.router.navigateByUrl('programacion');
    }else{
      this.editarComponentesService.cambiarEsCrear(false);
      /**Cargar los datos a ver o editar */
      if(AuxiliarEditarProgramacionComponent.recibido!=null){
        this.idPacienteAgendado = AuxiliarEditarProgramacionComponent.recibido.idPac;
        this.idAcudienteAgendado = AuxiliarEditarProgramacionComponent.recibido.idAcu;
        this.codigoProcedimiento = AuxiliarEditarProgramacionComponent.recibido.codigoProc;
        this.idAgendaProcedimiento = AuxiliarEditarProgramacionComponent.recibido.idAgendaProcedimiento;
        this.observacion = AuxiliarEditarProgramacionComponent.recibido.observacion;
      }
      this.actualizarIds();
      }
  }

  /**Eventos */
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  public cancelarOnclick(){
    this.router.navigateByUrl('programacion');
  }

  public editarOnclick(){
    let paciente = this.pacienteCmp.getObjPaciente();
    let observacion = this.pacienteCmp.getObservacion();
    let acudiente = this.acudienteCmp.getObjAcudiente();
    let procedimiento = this.procedimientoCmp.getObjProcedimiento();
    let estadoCama = this.procedimientoCmp.getestadoCama();
    let agendamiento = this.horaFechaCmp.getAgendamiento();

    let idAgendaProc = AuxiliarEditarProgramacionComponent.recibido.idAgendaProcedimiento;

    var agendaEditar = AgendaEditar.fromOBJECTS(idAgendaProc,paciente,acudiente,procedimiento,agendamiento,observacion,estadoCama,'1');

    this.editarAgenda(agendaEditar);
  }
  /**Peticiones */
  public async editarAgenda(agendaEditar:AgendaEditar){
    console.log(agendaEditar.parseToJSON());
    let res = await this.agendaEditarService.update(agendaEditar).toPromise();
    if(res!=null)
    {
      this.openSnackBar('Se ha editado la agenda',AuxiliarEditarProgramacionComponent.recibido.idAgendaProcedimiento);
      this.router.navigateByUrl('programacion');
    }
  }

  /**Envios */
  public actualizarIds(){
    this.editarComponentesService.cambiarIdPac(this.idPacienteAgendado);
    this.editarComponentesService.cambiarIdAcu(this.idAcudienteAgendado);
    this.editarComponentesService.cambiarIdProc(this.codigoProcedimiento);
    this.editarComponentesService.cambiaridAgendaProc(this.idAgendaProcedimiento);
    this.editarComponentesService.cambiarObservacion(this.observacion);
    this.utilityService.changeIdProcedimiento(this.codigoProcedimiento);
    console.log('idAgenda'+parseInt(this.idAgendaProcedimiento));
    this.utilityService.changeIdAgendaProcedimiento(parseInt(this.idAgendaProcedimiento));
  }
}
