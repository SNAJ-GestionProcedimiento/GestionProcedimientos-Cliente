import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogConfig } from "@angular/material/dialog";
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-auxiliar-material',
  templateUrl: './ventana-auxiliar-material.component.html',
  styleUrls: ['./ventana-auxiliar-material.component.css']
})
export class VentanaAuxiliarMaterialComponent implements OnInit {

  mats: material[] = [new material(1, 1234, 'Pinza', '', '','','','', 0,'',''),
  new material(2, 5678, 'Hilo', '', '','','','', 0,'',''), new material(3, 9012, 'Visturi', '', '','','','', 0,'','')];

  

  dataSource = new MatTableDataSource<material>(this.mats);

  displayedColumns: string[] = ['posicion', 'codigo', 'nombre', 'estado', 'casa', 'fechaSol', 'fechaCom', 'fechaLlegada', 'cantidad', 'unidad', 'acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialogRef<material>, public dial: MatDialog,
    @ Inject(MAT_DIALOG_DATA) public data: material) { }

  @ViewChild(MatTable) tabla1: MatTable<material>;




  ngOnInit(): void {
      


  }

  cancelar(){
    this.dialog.close();

  }

}

export class material{

  constructor(public posicion: number,
    public codigo: number,
    public nombre: string,
    public estado: string,
    public casa: string,
    public fechaSol: string,
    public fechaCom: string,
    public fechaLlegada: string,
    public cantidad: number,
    public unidad: string,
    public acciones: string){

  }
  
}