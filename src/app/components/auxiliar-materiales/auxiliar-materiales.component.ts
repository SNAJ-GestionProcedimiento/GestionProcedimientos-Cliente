import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-auxiliar-materiales',
  templateUrl: './auxiliar-materiales.component.html',
  styleUrls: ['./auxiliar-materiales.component.css']
})

export class AuxiliarMaterialesComponent implements OnInit {

  displayedColumnsMat: string[] = ['posicion', 'codigo', 'nombre', 'estado', 'casa', 'fechaSol', 'fechaCom', 'fechaLlegada', 'acciones'];
  
  
  dataSourceMat = new MatTableDataSource<Materiales>(ELEMENT_DATA_MAT);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}

export interface Materiales{
  posicion: number,
  codigo: number,
  nombre: string,
  estado: string,
  casa: string,
  fechaSol: string,
  fechaCom: string,
  fechaLlegada: string,
  acciones: string
}

const ELEMENT_DATA_MAT: Materiales[]=[
  {posicion: 1, codigo: 234234, nombre: 'Pinzas', estado: 'Solicitado', casa: 'Ni idea', fechaSol: '13 Septiembre', fechaCom: '15 Septiembre', fechaLlegada: '15 Septiembre', acciones: 'editar'}
]
