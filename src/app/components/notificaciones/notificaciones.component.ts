import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProcedimientoAgenda } from 'src/_models/models_Agenda/procedimiento-agenda.model';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';
import { AgendaListarService } from 'src/_services/serviciosAgenda/agenda-listar.service';
import { AgendaInfoComponent } from '../auxiliar-agenda/agenda-info/agenda-info.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [DatePipe]
})
export class NotificacionesComponent implements OnInit {

  agenda: Array<ProcedimientoAgenda>;
  agendaDeHoy: Array<ProcedimientoAgenda>;
  agendaDeManana: Array<ProcedimientoAgenda>;
  agendaDePasadoManana: Array<ProcedimientoAgenda>;

  fechaActual: string = "";
  horaActual: string = ""
  fechaManana: string = "";
  fechaPasadoManana: string = "";

  numeroNotificaciones: number;
  bandera: number;

  public dataSourceHoy;
  public dataSourceManana;
  public dataSourcePasadoManana;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private agendaProcedimientoService: AgendaListarService,
    private miDatePipe: DatePipe,
    private numNotificacion: NumeroNotificacionesService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.agendaDeHoy = new Array<ProcedimientoAgenda>();
    this.agendaDeManana = new Array<ProcedimientoAgenda>();
    this.agendaDePasadoManana = new Array<ProcedimientoAgenda>();
    this.numNotificacion.customBandera.subscribe(msg => {
      this.bandera = msg;
      this.getAgendas()
    });
    this.numNotificacion.customNumeroNotificaciones.subscribe(msg => this.numeroNotificaciones = msg);
    this.getAgendas();
  }

  /**Peticiones */
  public async getAgendas() {
    let res: any = await this.agendaProcedimientoService.list().toPromise();
    if (res != null) {
      this.agenda = new Array<ProcedimientoAgenda>();
      res.forEach(element => {
        let procAgenda = ProcedimientoAgenda.fromJSON(element);
        this.agenda.push(procAgenda);
      });
      this.agendaDeHoy = new Array<ProcedimientoAgenda>();
      this.agendaDeManana = new Array<ProcedimientoAgenda>();
      this.agendaDePasadoManana = new Array<ProcedimientoAgenda>();
      this.obtenerFechaActual();
      this.agendaHoy();
      this.agendaMañana();
      this.agendaPasado();
      this.numeroNotificaciones = 0;
      this.sumarProcedimientos();
    }
  }

  obtenerFechaActual() {
    var f = new Date();
    const fechaFormateada = this.miDatePipe.transform(f, 'yyyy-MM-dd');
    this.fechaActual = fechaFormateada;
  }

  agendaHoy() {
    let horaActual = new Date();
    const fechaFormateada = this.miDatePipe.transform(horaActual, 'h:mm a');
    this.horaActual = fechaFormateada;
    let sacarPmAm = this.horaActual.split(" ");
    let sacarHora = sacarPmAm[0].split(":");
    let Hora1 = parseInt(sacarHora[0]);
    let min1 = parseInt(sacarHora[1]);


    for (let i = 0; i < this.agenda.length; i++) {
      let sacarPmAm2 = this.agenda[i].horaProc.split(" ");
      let sacarHora2 = sacarPmAm2[0].split(":");
      let Hora2 = parseInt(sacarHora2[0]);
      let min2 = parseInt(sacarHora2[1]);
      if (this.agenda[i].fechaProc == this.fechaActual) {
        if (Hora1 <= Hora2) {
          if (min1 <= min2) {
            if (sacarPmAm[1] == sacarPmAm2[1]) {
              this.agendaDeHoy.push(this.agenda[i]);
            }
          }
        }
      }
    }
    this.dataSourceHoy = new MatTableDataSource<any>(this.agendaDeHoy);
    this.dataSourceHoy.paginator = this.paginator;
  }

  agendaMañana() {
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
    const fechaFormateada = this.miDatePipe.transform(manana, 'yyyy-MM-dd');
    this.fechaManana = fechaFormateada;
    for (let i = 0; i < this.agenda.length; i++) {
      if (this.agenda[i].fechaProc == this.fechaManana) {
        this.agendaDeManana.push(this.agenda[i]);
      }
    }
    this.dataSourceManana = new MatTableDataSource<any>(this.agendaDeManana);
    this.dataSourceManana.paginator = this.paginator;
  }

  agendaPasado() {
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS * 2);
    const fechaFormateada = this.miDatePipe.transform(manana, 'yyyy-MM-dd');
    this.fechaPasadoManana = fechaFormateada;
    for (let i = 0; i < this.agenda.length; i++) {
      if (this.agenda[i].fechaProc == this.fechaPasadoManana) {
        this.agendaDePasadoManana.push(this.agenda[i]);
      }
    }
    this.dataSourcePasadoManana = new MatTableDataSource<any>(this.agendaDePasadoManana);
    this.dataSourcePasadoManana.paginator = this.paginator;
  }

  //sumar notificaciones
  sumarProcedimientos() {
    this.numeroNotificaciones = this.agendaDeHoy.length + this.agendaDeManana.length + this.agendaDePasadoManana.length;
    this.numNotificacion.changeNumeroNotificacion(this.numeroNotificaciones);
  }

  //Validar si los procedimientos tienen datos o no
  validarProcedimientoHoy(): Boolean {
    let res = false;
    if (this.agendaDeHoy.length != 0) {
      res = true;
    }
    return res;
  }
  validarProcedimientoManana(): Boolean {
    let res = false;
    if (this.agendaDeManana.length != 0) {
      res = true;
    }
    return res;
  }
  validarProcedimientoPasadoManana(): Boolean {
    let res = false;
    if (this.agendaDePasadoManana.length != 0) {
      res = true;
    }
    return res;
  }

  ver(procedimiento: ProcedimientoAgenda) {
    AgendaInfoComponent.idPaciente = procedimiento.idPac;
    AgendaInfoComponent.idAgendaProcedimiento = procedimiento.idAgendaProcedimiento;
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.matDialog.open(AgendaInfoComponent, dialogoConfig);
  }

  pasarCursor() {
    var stylo = document.getElementById("cajon");
    stylo.style.cursor = "pointer";
  }

  enableDisableRule(elem) {
    const colorOne = "rgb(90, 102, 104)";
    const colorTwo = "rgb(143, 155, 166)";
    console.log("=>"+elem.className);
    if (elem.getElementById !== "visitas")
    { elem = elem.closest('.visitas'); }
    elem.style.backgroundColor = (elem.style.backgroundColor == colorOne) ? colorTwo : colorOne;
  }
}
