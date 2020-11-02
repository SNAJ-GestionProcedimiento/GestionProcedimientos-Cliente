import {AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { VentanaAuxiliarMaterialComponent } from '../ventana-auxiliar-material/ventana-auxiliar-material.component';
import {MaterialRequerido} from '../../../_models/material.model';


@Component({
  selector: 'app-auxiliar-materiales',
  templateUrl: './auxiliar-materiales.component.html',
  styleUrls: ['./auxiliar-materiales.component.css'],
})

export class AuxiliarMaterialesComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";

  mats: MaterialRequerido[] = [new MaterialRequerido(),
  new MaterialRequerido(), new MaterialRequerido()];

  displayedColumnsMat: string[] = [ 'codigo', 'nombre', 'estado', 'casa', 'fechaSol', 'fechaCom', 'fechaLlegada', 'cantidad', 'unidad', 'acciones'];
  dataSourceMat = new MatTableDataSource<MaterialRequerido>(this.mats);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceMat.paginator = this.paginator;
  }
  openAgregarMaterial() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.open(VentanaAuxiliarMaterialComponent, dialogoConfig);
  }
 

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

}

  




/*const ELEMENT_DATA_MAT: Materiales[]=[
  {posicion: 1, codigo: 234234, nombre: 'Pinzas', estado: 'Solicitado', casa: 'Ni idea', fechaSol: '13 Septiembre', fechaCom: '15 Septiembre', fechaLlegada: '15 Septiembre', cantidad: 14, unidad: 'm', acciones: 'editar'},
  {posicion: 2, codigo: 323423, nombre: 'otros', estado: 'Solicitado', casa: 'aja', fechaSol: '13 Septiembre', fechaCom: '15 Septiembre', fechaLlegada: '15 Septiembre', cantidad: 14, unidad: 'm', acciones: 'editar'}
]*/
