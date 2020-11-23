import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InstrumentosEquiposService } from 'src/_services/serviciosInstrumentos/instrumentos-equipos.service';
import { editInstrumentosEquipos, InstrumentosEquipos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';

import { estadoClass, obtenerEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import * as notificationService from 'src/_services/notification.service';
import { VentanaAuxiliarInstrumentosEquiposComponent } from '../ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { VentanaEditarInstrumentoEquipoComponent } from '../ventana-editar-instrumento-equipo/ventana-editar-instrumento-equipo.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-auxiliar-instrumentos-equipos',
  templateUrl: './auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./auxiliar-instrumentos-equipos.component.css']
})
export class AuxiliarInstrumentosEquiposComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string = "";//Codigo del procedimiento seleccionado

  parrafo = "";//para colocar que no hay nada en las tablas
  idProcedimiento: string;
  idAgendaProcedimiento: number;

  editInstrument: editInstrumentosEquipos;  //variable utilizada para editar los instrumentos
  estados: estadoClass[];  //variable que tiene el array de estados
  arrayInstrumentos: InstrumentosEquipos[];
  instrumentoEditable: InstrumentosEquipos;
  datosAddTabla: InstrumentosEquipos[] = [];
  instrumentosRequeridos: InstrumentosEquipos[] = [];
  idModalidad: string;
  public idProcedimientoModalidad: string;

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'descripcion', 'estado', 'acciones'];  //las columnas de la tabla asociadas a las propiedades
  dataIntrumentEquip: MatTableDataSource<InstrumentosEquipos>; //variable que contiene los datos que irán en la tabla

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; //utilizado para paginar la tabla


  constructor(
    private dialogo: MatDialog,
    private serviceIntrumentosEquipos: InstrumentosEquiposService,
    private notificationService: notificationService.NotificationService,
    private utilityService: UtilityServiceService
  ) { }
 
  //la inicialización del componente
  ngOnInit(): void {
    this.utilityService.customInstrumento.subscribe(msg => {
      this.instrumentoEditable = msg;
    });
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    //console.log("idProcedimiento desde instrumento: " + this.idProcedimiento);
    this.utilityService.customEstados.subscribe(msg => this.estados = msg);
    this.estados = obtenerEstado.getEstadoObtenido();
    this.utilityService.changeEstado(this.estados);
    
    this.utilityService.customInstrumentoAdd.subscribe(msg => {
      this.datosAddTabla = msg;
      if (this.idProcedimiento != "") {
        this.listarIntrumentEquip()
      }
    });
    this.utilityService.customIdModalidad.subscribe(msg => this.idModalidad = msg);
    this.utilityService.customIdProcedimientoModalidad.subscribe(msg => this.idProcedimientoModalidad = msg);
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento = msg);
  }

  //método para en listar los equipos asociados a un procedimiento
  public listarIntrumentEquip() {
    this.parrafo = "";
    console.log("desde instrumentos: " + this.idAgendaProcedimiento);
    this.serviceIntrumentosEquipos.getInstrumentoEquipo(this.idAgendaProcedimiento).subscribe((result: InstrumentosEquipos[]) => {
      this.arrayInstrumentos = InstrumentosEquipos.fromJSON(result);
      if (this.arrayInstrumentos != null) {
        this.convertirEstadoLleda(this.arrayInstrumentos);
        this.listarIntrumentosRequeridos();
      } else {
        this.arrayInstrumentos = [];
        this.parrafo = "No hay instrumentos y/o equipos asociado al procedimiento";
        this.notificationService.success('No hay instrumentos y/o equipos asociados al procedimiento!');
      }
      this.dataIntrumentEquip = new MatTableDataSource(this.arrayInstrumentos); //se le envia los datos a la tabla. 
      this.dataIntrumentEquip.paginator = this.paginator;
    });
  }

  listarIntrumentosRequeridos() {
    //console.log("idProcedimiento " + this.idProcedimiento + " idModalidad: " + this.idModalidad);
    //parseInt(this.idModalidad)
    if (parseInt(this.idModalidad) != null) {
      this.serviceIntrumentosEquipos.getInstrumentosRequeridos(parseInt(this.idProcedimiento), parseInt(this.idModalidad)).subscribe(
        (restultado: InstrumentosEquipos[]) => this.instrumentosRequeridos = restultado);
    } else {
      this.notificationService.success('No hay una modalidad creada, por favor verifica la creación del procedimiento!');
    }
  }

  //metodo para editar un instrumento
  editarIntrumentoEquipo(Instrument: InstrumentosEquipos): void {
    this.instrumentoEditable = Instrument;
    this.utilityService.changeIntrumento(this.instrumentoEditable);

 
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(VentanaEditarInstrumentoEquipoComponent, dialogoConfig);
  }

  validarInstrumentoRequerido(Instrument: InstrumentosEquipos): Boolean {
    let res = false;
    for (let i = 0; i < this.instrumentosRequeridos.length; i++) {
      if (this.instrumentosRequeridos[i].nombre == Instrument.nombre) {
        res = true;
        break;
      }
    }
    return res;
  }

  eliminarDato(Instrument: InstrumentosEquipos) {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar el instrumento o equipo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.arrayInstrumentos.length; i++) {
            //console.log("intrumento traido: " + JSON.stringify(Instrument));
            //console.log("intrumento a evaluar: " + JSON.stringify(this.arrayInstrumentos[i]));
            if (this.arrayInstrumentos[i].nombre == Instrument.nombre) {
              //console.log("entro al if!");
              this.serviceIntrumentosEquipos.deleteInstrumento(this.arrayInstrumentos[i].id).subscribe();
              this.listarIntrumentEquip();
              this.listarIntrumentosRequeridos();
              break; 
            }
          }
        }
        this.listarIntrumentEquip();
        this.listarIntrumentosRequeridos();
      });
  }

  //método para abrir una ventana emergente
  openAgregarIntru() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(VentanaAuxiliarInstrumentosEquiposComponent, dialogoConfig);
  }

  convertirEstadoLleda(instrumentoAcambiar) {
    for (let i = 0; i < instrumentoAcambiar.length; i++) {
      for (let j = 0; j < this.estados.length; j++) {
        if (instrumentoAcambiar[i].estado == this.estados[j].valor) {
          instrumentoAcambiar[i].estado = this.estados[j].contenido;
        }
      }
    }
  }

  convertirEstadoSalida(instrumentoAcambiar): InstrumentosEquipos {
    for (let j = 0; j < this.estados.length; j++) {
      if (instrumentoAcambiar.estado == this.estados[j].contenido) {
        instrumentoAcambiar.estado = this.estados[j].valor;
      }
    }
    return instrumentoAcambiar;
  }
}


