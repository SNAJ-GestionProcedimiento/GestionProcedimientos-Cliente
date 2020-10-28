import { Component, OnInit, ViewChild } from '@angular/core';

import { AuxiliarEspecialistaComponent } from '../auxiliar-especialista/auxiliar-especialista.component';
import { AuxiliarInstrumentosEquiposComponent } from '../auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
import { ProcedimientoComponent } from '../procedimiento/procedimiento.component';
import { PacienteComponent } from 'src/app/components/paciente/paciente.component';
import { AcudienteComponent } from 'src/app/components/acudiente/acudiente.component';
import { HoraFechaComponent } from 'src/app/components/hora-fecha/hora-fecha.component';

import { AgendaCrear } from 'src/_models/agenda-crear.model';

import { AgendaProcedimientoService } from 'src/_services/agenda-procedimiento.service';

@Component({
  selector: 'app-auxiliar-programacion',
  templateUrl: './auxiliar-programacion.component.html',
  styleUrls: ['./auxiliar-programacion.component.css']
})
export class AuxiliarProgramacionComponent implements OnInit {
  
  @ViewChild(AuxiliarInstrumentosEquiposComponent) listarInstrumentos: AuxiliarInstrumentosEquiposComponent;
  @ViewChild(AuxiliarEspecialistaComponent) listarEspecialidad: AuxiliarEspecialistaComponent;

  @ViewChild(ProcedimientoComponent) procedimientoCmp: ProcedimientoComponent;
  @ViewChild(PacienteComponent) pacienteCmp: PacienteComponent;
  @ViewChild(AcudienteComponent) acudienteCmp: AcudienteComponent;
  @ViewChild(HoraFechaComponent) horaFechaCmp: HoraFechaComponent;

  public agendaNueva : AgendaCrear;

  public idProcedimientoInstrumento: string;  //variable para obtener el id del procedimiento
  public edadPaciente:number;
  public activoAcudiente:boolean; 
  public message:boolean;
  public codigoProcedimiento:string='';

  constructor(
    private agendaProcedimiento:AgendaProcedimientoService
  ) { }

  receiveMessage($event) {
    this.message = $event
    //console.log($event);
  }

  ngOnInit(): void {
    
  }

  public setIdProcedimiento(){
    //console.log('Desde el padre:'+this.procedimientoCmp.getCodigoProcedimiento());
  }

  listarInstrumentosDesdeProgramacion(){
    this.setIdProcedimiento();
    this.listarInstrumentos.listarIntrumentEquip();
    this.listarEspecialidad.listarEspecialidades();
  }

  crearAgendaonClick(){
    /**Captura de campos */
    let paciente = this.pacienteCmp.getObjPaciente();
    let observacion = this.pacienteCmp.getObservacion();
    let acudiente = this.acudienteCmp.getObjAcudiente();
    let proceModalidad = this.procedimientoCmp.getObjProcedimientoModalidad();
    let estadoCama = this.procedimientoCmp.getestadoCama();
    let hora = this.horaFechaCmp.getElemento('hora');
    let fecha = this.horaFechaCmp.getElemento('fecha');
    let estadoAgenda = this.horaFechaCmp.getElemento('estado');
    let salaId = this.horaFechaCmp.getElemento('salaId');
  
    /**Creacion del modelo */
    let agenda:AgendaCrear = new AgendaCrear(paciente,acudiente,proceModalidad,fecha,hora,estadoCama,estadoAgenda,observacion,salaId,'1');

    this.crearAgenda(agenda);
    
  }

  /**Peticiones */
  public async crearAgenda(agenda:AgendaCrear){
    let res:any = await this.agendaProcedimiento.create(agenda).toPromise();
    if(res!=null){
      console.log(res);
      this.codigoProcedimiento=this.procedimientoCmp.getCodigoProcedimiento();
      this.listarInstrumentosDesdeProgramacion();
    }
  }
}
