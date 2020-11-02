import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Paciente } from 'src/_models/paciente.model';
import { Acudiente } from 'src/_models/acudiente.model';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { AgendaVer } from 'src/_models/models_Agenda/agenda-ver.model';

import { AgendaObtenerService } from 'src/_services/serviciosAgenda/agenda-obtener.service';
import { PacienteService } from 'src/_services/paciente.service';
import { AcudienteService } from 'src/_services/acudiente.service';
import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { AgendaInfoService } from 'src/_services/serviciosComponentes/agenda-info.service';


@Component({
  selector: 'app-agenda-info',
  templateUrl: './agenda-info.component.html',
  styleUrls: ['./agenda-info.component.css']
})
export class AgendaInfoComponent implements OnInit {
  public agendaVer:AgendaVer = new AgendaVer;
  public paciente:Paciente = new Paciente;
  public acudiente:Acudiente = new Acudiente;
  public procedimiento:Procedimiento;

  public static idAgendaProcedimiento:string;
  public static idPaciente:string;
  public idAcudiente:string='';

  constructor(
    private agendaObtenerService:AgendaObtenerService,
    private pacienteService:PacienteService,
    private acudienteService:AcudienteService,
    private procedimientoService:ProcedimientoService,
    private matDialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.setAgendaProcedimiento(AgendaInfoComponent.idAgendaProcedimiento);
    this.setPaciente(AgendaInfoComponent.idPaciente);
  }

  public cerrarOnclick(){
    this.matDialog.closeAll();
  }

  /**Peticiones */
  public async setAgendaProcedimiento(idAgendaProc:string){
    let res = await this.agendaObtenerService.get(idAgendaProc).toPromise();
    this.agendaVer = AgendaVer.fromJSON(res);
    this.idAcudiente = this.agendaVer.idAcu;
    this.setAcudiente();
    console.log(res);
    console.log(this.agendaVer);
  }
  public async setPaciente(idPaciente:string){
    let res = await this.pacienteService.get(idPaciente).toPromise();
    this.paciente = Paciente.fromJSON(res);
  }
  public async setAcudiente(){
    let res = await this.acudienteService.get(this.idAcudiente).toPromise();
    this.acudiente = Acudiente.fromJSON(res);
  }
  public async setProcedimiento(Codigo:string){

  }
}
