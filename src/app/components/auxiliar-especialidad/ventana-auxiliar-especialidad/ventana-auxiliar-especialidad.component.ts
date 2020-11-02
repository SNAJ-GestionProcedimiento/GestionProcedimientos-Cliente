import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';
import { especialidadesPrevisualizar, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import * as notificationService from 'src/_services/notification.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { UtilityServiceService } from 'src/_services/utility-service.service';

@Component({
  selector: 'app-ventana-auxiliar-especialidad',
  templateUrl: './ventana-auxiliar-especialidad.component.html',
  styleUrls: ['./ventana-auxiliar-especialidad.component.css']
})
export class VentanaAuxiliarEspecialidadComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombreEspecialidad', 'cantidad', 'acciones'];
  dataSource = null;
  especialidadBandera: especialidadesRequeridas;
  arrayEspecialidadesCantidad: especialidadesPrevisualizar[] = [];
  datosAdd: especialidadesPrevisualizar;

  customertext: number = 1;

  opcionSeleccionado: string = '0';
  verSeleccion = '';
  datosSeleccionador: especialidadesPrevisualizar[] = [];
  idAgendaProcedimiento: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialogo: MatDialog,
    private serviceEspecialidadRequerida: EspecilidadRequeridaService,
    private notificationService: notificationService.NotificationService,
    private utilityService: UtilityServiceService
  ) { }

  ngOnInit(): void {
    this.getAllEspecialidad();
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento = msg);
    this.utilityService.customEspecialidadAdd.subscribe(msg => this.especialidadBandera = msg);
  }

  //obtener los nombres de las especialidades de la BD
  getAllEspecialidad() {
    this.serviceEspecialidadRequerida.getAllEspecialidades().subscribe((result: especialidadesPrevisualizar[]) => {

      this.arrayEspecialidadesCantidad = result;
      //console.log("desde añadir instrumento: " + this.arrayInstrumentos);
      if (this.arrayEspecialidadesCantidad != null) {
        //ordena el array por nombre
        this.arrayEspecialidadesCantidad.sort(function (a, b) {
          return ((a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1 : 0));
        })
        //console.log("array: " + JSON.stringify(this.arrayEspecialidadesCantidad));
        for (let i = 0; i < this.arrayEspecialidadesCantidad.length; i++) {
          this.arrayEspecialidadesCantidad[i].cantidad = 1;
          this.arrayEspecialidadesCantidad[i].idAgendaProcedimiento = this.idAgendaProcedimiento;
          this.arrayEspecialidadesCantidad[i].estado = "PEND";
        }
      } else {
        this.notificationService.success('No hay especialidades en la base de datos');
      }
    });
  }
  //Captura el nombre seleccionado
  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    this.agregarDatoTabla();
  }

  //agrega la especialidad a la tabla de la vista previa
  agregarDatoTabla() {
    for (let i = 0; i < this.arrayEspecialidadesCantidad.length; i++) {
      if (this.arrayEspecialidadesCantidad[i].nombre == this.verSeleccion) {
        if (!this.datosSeleccionador.includes(this.arrayEspecialidadesCantidad[i])) {
          this.datosSeleccionador.push(this.arrayEspecialidadesCantidad[i]);
          this.dataSource = new MatTableDataSource(this.datosSeleccionador);
          this.dataSource.paginator = this.paginator;
          break;
        }
      }
    }
  }

  keyPress(event: any, datoACambiar: especialidadesPrevisualizar) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    this.onChange(datoACambiar);
  }

  onChange(datoACambiar: especialidadesPrevisualizar) {
    let int;
    for (let i = 0; i < this.arrayEspecialidadesCantidad.length; i++) {
      if (this.arrayEspecialidadesCantidad[i].codigoEspecialidad == datoACambiar.codigoEspecialidad) {
        this.arrayEspecialidadesCantidad[i].cantidad = this.customertext;
        int = i;
        break;
      }
    }
    console.log(JSON.stringify(this.arrayEspecialidadesCantidad[int]));
  }
  confirmacionLimpiar() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar TODOS las especialidades que ha agregado en la tabla?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.limpiarLista();
        }
      });
  }

  limpiarLista() {
    this.datosSeleccionador = [];
    this.dataSource = new MatTableDataSource(this.datosSeleccionador);
    this.dataSource.paginator = this.paginator;
  }


  cancelar() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea SALIR de la ventana añadir especialidades puesto que si sale y tiene especialidades en la vista previa estos no se añadirán y se borrará de la tabla?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.dialogo.closeAll();
        }
      });
  }

  eliminarDato(datoAEliminar: especialidadesPrevisualizar) {
    for (let i = 0; i < this.datosSeleccionador.length; i++) {
      if (this.datosSeleccionador[i] == datoAEliminar) {
        this.datosSeleccionador.splice(i, 1);
        this.dataSource = new MatTableDataSource(this.datosSeleccionador);
        this.dataSource.paginator = this.paginator;
        break;
      }
    }
  }

  addInstruments() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea añadir todos los intrumentos y/o equipos que ha agregado en la tabla?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          //this.datosAdd = this.datosSeleccionador;
          for (let i = 0; i < this.datosSeleccionador.length; i++) {
            for (let j = 0; j < this.datosSeleccionador[i].cantidad; j++) {
              let res = this.serviceEspecialidadRequerida.addEspecialidad(this.datosSeleccionador[i]).subscribe();
              if (res != null) {
                //this.especialidadBandera=this.datosSeleccionador[i];
                this.utilityService.changeEspecialidadAdd(this.especialidadBandera);
              }
            }

          }
          //this.utilityService.changeIntrumentoAdd(this.datosAdd);
          this.dialogo.closeAll();
        }
      });

  }
}
