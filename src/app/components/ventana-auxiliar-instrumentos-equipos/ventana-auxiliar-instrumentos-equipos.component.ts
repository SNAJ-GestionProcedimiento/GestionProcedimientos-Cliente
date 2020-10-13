import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ventana-auxiliar-instrumentos-equipos',
  templateUrl: './ventana-auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./ventana-auxiliar-instrumentos-equipos.component.css']
})
export class VentanaAuxiliarInstrumentosEquiposComponent implements OnInit {

  displayedColumns: string[] = ['No', 'codigo', 'nombre', 'cantidad', 'descripcion', 'acciones'];
  datos: instrument[] = [];
  dataSource = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)

      this.datos.push(new instrument(x, Math.trunc(Math.random() * 1000), `artículo ${x}`, x, `artículo ${x}`, ``));
    this.dataSource = new MatTableDataSource<instrument>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

}

export class instrument {
  constructor(public No: number, public codigo: number, public nombre: string, public cantidad: number, public descripcion: string, public acciones: string) {
  }
}
