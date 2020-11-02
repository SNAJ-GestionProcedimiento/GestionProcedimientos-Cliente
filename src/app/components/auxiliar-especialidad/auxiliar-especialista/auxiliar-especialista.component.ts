import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import * as notificationService from 'src/_services/notification.service';
import { estadoClass, obtenerEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { VentanaAuxiliarEspecialidadComponent } from '../ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { EditarEspecialidadComponent } from '../editar-especialidad/editar-especialidad.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-auxiliar-especialista',
  templateUrl: './auxiliar-especialista.component.html',
  styleUrls: ['./auxiliar-especialista.component.css']
})
export class AuxiliarEspecialistaComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string = "";//Codigo del procedimiento seleccionado

  displayedColumns: string[] = ['codigoEspecialidad', 'nombreEspecialidad', 'registroMedico', 'identificacion', 'nombreEspecialista', 'estado', 'acciones'];
  dataEspecialidad = null;
  parrafo = "";
  estados: estadoClass[];  //variable que tiene el array de estados
  especialidadAsociada: especialidadesRequeridas[];
  especialidadEditable: especialidadesRequeridas;
  idProcedimiento: string;
  idAgendaProcedimiento: number;
  idModalidad: string;
  especialidadBandera: especialidadesRequeridas;
  especialidadesRequeridas: especialidadesRequeridas[] = [];

  mensajeError: string="";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogo: MatDialog,
    private serviceEspecialidadRequerida: EspecilidadRequeridaService,
    private notificationService: notificationService.NotificationService,
    private utilityService: UtilityServiceService
  ) { }

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => { this.estados = msg });
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    this.utilityService.customEspecialidad.subscribe(msg => this.especialidadEditable = msg);
    this.estados = obtenerEstado.getEstadoObtenido();
    this.utilityService.customEspecialidadAdd.subscribe(msg => {
      this.especialidadBandera = msg;
      if (this.idProcedimiento != "") {
        this.listarEspecialidades();
      }
    });
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento = msg);
    this.utilityService.customIdModalidad.subscribe(msg => this.idModalidad = msg);
  }

  //método para en listar los equipos asociados a un procedimiento
  listarEspecialidades() {
    this.parrafo = "";
    this.serviceEspecialidadRequerida.getEspecialidadRequerida(this.idAgendaProcedimiento).subscribe((rest: especialidadesRequeridas[]) => {
      //console.log("estado desde especialidad, " + this.estados[0].contenido);
      this.especialidadAsociada = especialidadesRequeridas.fromJSON(rest);
      //console.log("estado desde especialidad, " + JSON.stringify(this.especialidadAsociada));
      if (this.especialidadAsociada != null) {
        this.parrafo = "";
        this.convertirEstadoLleda(this.especialidadAsociada);
        this.listarEspecialidadesRequeridos();
      } else {
        this.especialidadAsociada = [];
        this.parrafo = "No hay especialidad asociado al procedimiento";
        this.notificationService.success('No hay especialistas asociados al procedimiento!');
      }
      this.dataEspecialidad = new MatTableDataSource(this.especialidadAsociada);
      this.dataEspecialidad.paginator = this.paginator;
    }, (errorServicio)=>{
      console.log(errorServicio);
      this.mensajeError= errorServicio.console.error.error.message;
    }
    );

  }

  listarEspecialidadesRequeridos() {
    //console.log("idProcedimiento " + this.idProcedimiento + " idModalidad: " + this.idModalidad);
    //parseInt(this.idModalidad)
    if (parseInt(this.idModalidad) != null) {
      this.serviceEspecialidadRequerida.getEspecialidadesRequeridos(parseInt(this.idProcedimiento), parseInt(this.idModalidad)).subscribe(
        (restultado: especialidadesRequeridas[]) => this.especialidadesRequeridas = restultado);
    } else {
      this.notificationService.success('No hay una modalidad creada, por favor verifica la creación del procedimiento!');
    }
  }


  editarEspecialidad(especialidad: especialidadesRequeridas): void {
    this.especialidadEditable = especialidad;
    this.utilityService.changeEspecialidad(this.especialidadEditable);
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(EditarEspecialidadComponent, dialogoConfig);
  }

  validarEspecialidadRequerido(especialidad: especialidadesRequeridas): Boolean {
    let res = false;
    for (let i = 0; i < this.especialidadesRequeridas.length; i++) {
      if (this.especialidadesRequeridas[i].nombreEspecialidad == especialidad.nombreEspecialidad) {
        res = true;
        break;
      }
    }
    return res;
  }

  eliminarDato(especialidad: especialidadesRequeridas) {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar el instrumento o equipo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.especialidadAsociada.length; i++) {
            //console.log("intrumento traido: " + JSON.stringify(Instrument));
            //console.log("intrumento a evaluar: " + JSON.stringify(this.arrayInstrumentos[i]));
            if (this.especialidadAsociada[i].nombreEspecialidad == especialidad.nombreEspecialidad) {
              //console.log("entro al if!");
              this.serviceEspecialidadRequerida.deleteEspecialidad(this.especialidadAsociada[i].id).subscribe();
              this.listarEspecialidades();
              this.listarEspecialidadesRequeridos();
              break;
            }
          }
        }
        this.listarEspecialidades();
        this.listarEspecialidadesRequeridos();
      });
  }


  openAgregarEspecialidad() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(VentanaAuxiliarEspecialidadComponent, dialogoConfig);
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

  convertirEstadoSalida(instrumentoAcambiar): especialidadesRequeridas {
    console.log("entro al método: " + instrumentoAcambiar.length);
    for (let j = 0; j < this.estados.length; j++) {
      console.log("uio que llego: " + instrumentoAcambiar.estado + " estado: " + this.estados[j].contenido);
      if (instrumentoAcambiar.estado == this.estados[j].contenido) {
        console.log("entro en salida");
        instrumentoAcambiar.estado = this.estados[j].valor;
      }
    }
    return instrumentoAcambiar;
  }

}
