import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-auxiliar-documentacion',
  templateUrl: './auxiliar-documentacion.component.html',
  styleUrls: ['./auxiliar-documentacion.component.css']
})
export class AuxiliarDocumentacionComponent implements OnInit {

  displayedColumnsDoc: string[] = ['posicion', 'codigo', 'nombre', 'estado', 'archivo', 'observacion', 'acciones' ];

  dataSourceDoc = new MatTableDataSource<Documentos>(ELEMENT_DATA_DOC);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceDoc.paginator = this.paginator;
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Documentos {

  posicion: number,
  codigo: number,
  nombre: string,
  estado: string,
  archivo: string,
  observacion: string,
  acciones: string
}

const ELEMENT_DATA_DOC: Documentos[] = [
  {posicion: 1, codigo: 1213124, nombre: 'Orden apoyo', estado: 'Disponible', archivo: 'Docu', observacion: 'Asdasda', acciones: 'editar'},
  
  {posicion: 2, codigo: 13453124, nombre: 'Constancia', estado: 'Pendiente', archivo: 'Docu', observacion: 'gdfgdfgdf', acciones: 'editar'}
];