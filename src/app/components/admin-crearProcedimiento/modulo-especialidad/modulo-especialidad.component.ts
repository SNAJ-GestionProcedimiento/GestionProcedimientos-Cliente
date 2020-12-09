import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { especialidadesPrevisualizar, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';
import * as notificationService from 'src/_services/notification.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';

@Component({
  selector: 'app-modulo-especialidad',
  templateUrl: './modulo-especialidad.component.html',
  styleUrls: ['./modulo-especialidad.component.css']
})
export class ModuloEspecialidadComponent implements OnInit {

  public busquedaForm: FormGroup;
  
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
    private utilityService: UtilityServiceService,
    private formBuilder: FormBuilder
  ) {
    this.buildbusquedaForm();
   }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';  //para que material este en español
    this.getAllEspecialidad();
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento = msg);
    this.utilityService.customEspecialidadAdd.subscribe(msg => this.especialidadBandera = msg);
  }

  /**Metodos de formularios */
  private buildbusquedaForm() {
    this.busquedaForm = this.formBuilder.group({
      cantidad: ['', []]
    });
    this.busquedaForm.get('cantidad').valueChanges
      .subscribe(value => {
        let cod=value;   
      });
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
    $("#mi_select4").val("0");
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

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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

  eliminarDato(datoAEliminar: especialidadesPrevisualizar) {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea ELIMINAR la especialidad de la lista?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.datosSeleccionador.length; i++) {
            if (this.datosSeleccionador[i] == datoAEliminar) {
              this.datosSeleccionador.splice(i, 1);
              this.dataSource = new MatTableDataSource(this.datosSeleccionador);
              this.dataSource.paginator = this.paginator;
              break;
            }
          }
        }
      });
  }

  validarCantidadVacia() {
    for (let i = 0; i < this.datosSeleccionador.length; i++) {
      if (this.datosSeleccionador[i].cantidad == null) {
        console.log("entre");
        this.datosSeleccionador[i].cantidad = 1;
      }
    }
  }

  getEspecialidadesRequeridas():especialidadesPrevisualizar[]{
    this.validarCantidadVacia();
    return this.datosSeleccionador;
  }

}
