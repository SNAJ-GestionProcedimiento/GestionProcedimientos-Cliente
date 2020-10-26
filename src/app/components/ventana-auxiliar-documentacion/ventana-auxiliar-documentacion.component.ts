import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogConfig } from "@angular/material/dialog";
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentoRequerido } from '../../../_models/documento.model';



@Component({
  selector: 'app-ventana-auxiliar-documentacion',
  templateUrl: './ventana-auxiliar-documentacion.component.html',
  styleUrls: ['./ventana-auxiliar-documentacion.component.css']
})
export class VentanaAuxiliarDocumentacionComponent implements OnInit {

  docs: DocumentoRequerido[] = [new DocumentoRequerido(),
  new DocumentoRequerido(), new DocumentoRequerido()];

 
  displayedColumnsDoc: string[] = ['posicion', 'codigo', 'nombre', 'estado', 'archivo', 'observacion', 'acciones'];


  dataSourceDoc = new MatTableDataSource<DocumentoRequerido>(this.docs);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public dialog: MatDialogRef<DocumentoRequerido>, public dial: MatDialog,
    @ Inject(MAT_DIALOG_DATA) public data: DocumentoRequerido) {}


  @ViewChild(MatTable) tabla1: MatTable<DocumentoRequerido>;

  ngOnInit(): void {
   
   
  }

 

  cerrarVentana(){
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.close();
  }

  openAgregarDocumento(){
    //const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    

    const dialogoConfig= this.dial.open(VentanaAuxiliarDocumentacionComponent,{
      data: new DocumentoRequerido(),
    });

   dialogoConfig.afterClosed().subscribe(doc => {
     if(doc != undefined)
      this.agregar(doc);
   });
  }

  agregar(doc: DocumentoRequerido){
    this.docs.push(new DocumentoRequerido());
    this.tabla1.renderRows();
    
  }

  cancelar(){
    this.dialog.close();

  }

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.docs.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }
}





