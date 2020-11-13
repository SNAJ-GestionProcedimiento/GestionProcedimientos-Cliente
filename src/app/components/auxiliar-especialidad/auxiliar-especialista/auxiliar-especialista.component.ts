import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./auxiliar-especialista.component.css'],
})
export class AuxiliarEspecialistaComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string = "";//Codigo del procedimiento seleccionado

  //variables para mostrar las columnas de la tabla y el que obtiene los datos a mostrar
  displayedColumns: string[] = ['codigoEspecialidad', 'nombreEspecialidad', 'registroMedico', 'identificacion', 'nombreEspecialista', 'estado', 'acciones'];
  dataEspecialidad = null;

  /*variables utilizadas para obtener:
    estado, variable a editar, los requeridos y la lista de la agenda
  */
  estados: estadoClass[];  //variable que tiene el array de estados
  especialidadAsociada: especialidadesRequeridas[];
  especialidadEditable: especialidadesRequeridas;
  especialidadBandera: especialidadesRequeridas;
  especialidadesRequeridas: especialidadesRequeridas[] = [];

  //variables para obtener el idProcedimiento, idAgendaProcedimiento y idModalidad
  idProcedimiento: string;
  idAgendaProcedimiento: number;
  idModalidad: string;

  //variable para mostrar mensaje de error si lo hay
  mensajeError: string = "";
  parrafo = "";
  objBanderaRequerido: Boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private dialogo: MatDialog,
    private serviceEspecialidadRequerida: EspecilidadRequeridaService,
    private notificationService: notificationService.NotificationService,
    private utilityService: UtilityServiceService,
  ) { }

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => { this.estados = msg });
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    this.utilityService.customBanderaRequerido.subscribe(msg => {
      this.objBanderaRequerido = msg;
      if (this.objBanderaRequerido == true) {
        this.listarEspecialidadesRequeridos();
      }
    });
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
      this.especialidadAsociada = especialidadesRequeridas.fromJSON(rest);
      if (this.especialidadAsociada != null) {
        this.parrafo = "";
        this.convertirEstadoLleda(this.especialidadAsociada);
        this.listarEspecialidadesRequeridos();
      } else {
        this.especialidadAsociada = [];
        this.parrafo = "No hay especialidad asociado al procedimiento";
        this.notificationService.warn('No hay especialistas asociados al procedimiento!');
      }
      this.dataEspecialidad = new MatTableDataSource(this.especialidadAsociada);
      this.dataEspecialidad.paginator = this.paginator;
    }, (errorServicio) => {
      console.log(errorServicio);
      this.mensajeError = errorServicio.console.error.error.message;
    }
    );
  }

  //método para saber cuales son las especialidades requeridas (obligatorias)
  listarEspecialidadesRequeridos() {
    if (parseInt(this.idModalidad) != null) {
      this.serviceEspecialidadRequerida.getEspecialidadesRequeridos(parseInt(this.idProcedimiento), parseInt(this.idModalidad)).subscribe(
        (restultado: especialidadesRequeridas[]) => {
          this.especialidadesRequeridas = restultado;
          if (this.objBanderaRequerido == true) {
            for (let i = 0; i < this.especialidadesRequeridas.length; i++) {
              this.especialidadesRequeridas[i].registroMedico = "";
              this.especialidadesRequeridas[i].nombreEspecialista = "";
              this.especialidadesRequeridas[i].identificacion = "";
              this.especialidadesRequeridas[i].estado = "";
            }
            this.dataEspecialidad = new MatTableDataSource(this.especialidadesRequeridas);
            this.dataEspecialidad.paginator = this.paginator;
          }
        });
    } else {
      this.notificationService.warn('No hay una modalidad creada, por favor verifica la creación del procedimiento!');
    }
  }

  //método para llamar la ventana de edición y enviar la especialidad
  editarEspecialidad(especialidad: especialidadesRequeridas): void {
    this.especialidadEditable = especialidad;
    this.utilityService.changeEspecialidad(this.especialidadEditable);
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(EditarEspecialidadComponent, dialogoConfig);
  }

  //valida si la especialidad de una fila es requerida o no para que aparezca el botón de eliminar
  validarEspecialidadRequerido(especialidad: especialidadesRequeridas): Boolean {
    let res = false;
    if (this.objBanderaRequerido == true) {
      return true;
    } else {
      for (let i = 0; i < this.especialidadesRequeridas.length; i++) {
        if (this.especialidadesRequeridas[i].codigoEspecialidad == especialidad.codigoEspecialidad) {
          if (especialidad.requerido == true) {
            res = true;
            return res;
          }
        }
      }
    }
    return res;
  }

  //método para eliminar la especialidad específica
  eliminarDato(especialidad: especialidadesRequeridas) {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar el instrumento o equipo?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.especialidadAsociada.length; i++) {
            if (this.especialidadAsociada[i].nombreEspecialidad == especialidad.nombreEspecialidad) {
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

  //abre la ventana para agregar una especialidad
  openAgregarEspecialidad() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialogo.open(VentanaAuxiliarEspecialidadComponent, dialogoConfig);
  }

  //métodos para convertir el estado ya sea como se muestra al usuario y como se envia la consulta
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
