import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InstrumentosEquipos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';
import { InstrumentosEquiposService } from 'src/_services/serviciosInstrumentos/instrumentos-equipos.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-ventana-auxiliar-instrumentos-equipos',
  templateUrl: './ventana-auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./ventana-auxiliar-instrumentos-equipos.component.css']
})
export class VentanaAuxiliarInstrumentosEquiposComponent implements OnInit {

  data: Array<any>;
  arrayInstrumentos: InstrumentosEquipos[];
  opcionSeleccionado: string = '0';
  verSeleccion = '';
  datosSeleccionador: InstrumentosEquipos[] = [];

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<InstrumentosEquipos>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private serviceIntrumentosEquipos: InstrumentosEquiposService, private notificationService: notificationService.NotificationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllInstrumentos();

  }

  getAllInstrumentos() {
    this.serviceIntrumentosEquipos.getAllIntrumentos().subscribe((result: InstrumentosEquipos[]) => {

      this.arrayInstrumentos = InstrumentosEquipos.fromJSON(result);
      console.log("desde añadir instrumento: " + this.arrayInstrumentos);
      if (this.arrayInstrumentos != null) {
        for (let i = 0; i < this.arrayInstrumentos.length; i++) {
          this.arrayInstrumentos[i].cantidad = 1;
        }
      } else {
        this.notificationService.success('No hay instrumentos y/o equipos en la base de datos');
      }
    });
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    this.agregarDatoTabla();
  }

  agregarDatoTabla() {
    for (let i = 0; i < this.arrayInstrumentos.length; i++) {
      if (this.arrayInstrumentos[i].nombre == this.verSeleccion) {
        if (!this.datosSeleccionador.includes(this.arrayInstrumentos[i])) {
          this.datosSeleccionador.push(this.arrayInstrumentos[i]);
          this.dataSource = new MatTableDataSource(this.datosSeleccionador);
          this.dataSource.paginator = this.paginator;
        }
      }
    }
  }

  limpiarLista() {
    this.datosSeleccionador = [];
    this.dataSource = new MatTableDataSource(this.datosSeleccionador);
    this.dataSource.paginator = this.paginator;
  }

  cerrarVentana() {
    this.dialog.closeAll();
  }

  eliminarDato(datoAEliminar: InstrumentosEquipos){

  }

}

