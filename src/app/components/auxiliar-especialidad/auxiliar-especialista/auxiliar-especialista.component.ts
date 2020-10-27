import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import * as notificationService from 'src/_services/notification.service';
import { estadoClass, obtenerEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { especialidad, VentanaAuxiliarEspecialidadComponent } from '../ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { EditarEspecialidadComponent } from '../editar-especialidad/editar-especialidad.component';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private serviceEspecialidadRequerida: EspecilidadRequeridaService, private notificationService: notificationService.NotificationService, private utilityService: UtilityServiceService) { }

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => { this.estados = msg });
    this.utilityService.customEspecialidad.subscribe(msg => this.especialidadEditable = msg);
    this.estados = obtenerEstado.getEstadoObtenido();
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    console.log("idProcedimiento desde instrumento: " + this.idProcedimiento);
  }

  //método para en listar los equipos asociados a un procedimiento
  listarEspecialidades() {
    this.parrafo = "";
    this.serviceEspecialidadRequerida.getEspecialidadRequerida(parseInt(this.idProcedimiento)).subscribe((rest: especialidadesRequeridas[]) => {
      console.log("estado desde especialidad, " + this.estados[0].contenido);
      this.especialidadAsociada = especialidadesRequeridas.fromJSON(rest);
      if (this.especialidadAsociada != null) {
        this.convertirEstadoLleda(this.especialidadAsociada);
      } else {
        this.especialidadAsociada = [];
        this.parrafo = "No hay especialidad asociado al procedimiento";
        this.notificationService.success('No hay especialistas asociados al procedimiento!');
      }
      this.dataEspecialidad = new MatTableDataSource(this.especialidadAsociada); //se le envia los datos a la tabla. 
      this.dataEspecialidad.paginator = this.paginator;
    });

  }

  editarEspecialidad(especialidad: especialidadesRequeridas): void {
    this.especialidadEditable = especialidad;
    this.utilityService.changeEspecialidad(this.especialidadEditable);
    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialog.open(EditarEspecialidadComponent, dialogoConfig);
  }

  openAgregarEspecialidad() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialog.open(VentanaAuxiliarEspecialidadComponent, dialogoConfig);
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
