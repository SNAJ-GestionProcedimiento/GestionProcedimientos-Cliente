import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogConfig } from "@angular/material/dialog";
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DocumentoRequerido, previsualizarDocumentos, editarDocumentos } from '../../../_models/documento.model';
import { DocumentoService } from '../../../_services/documentacion.service';
import * as notificationService from 'src/_services/notification.service';
import { UtilityServiceService } from '../../../_services/utility-service.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";




@Component({
  selector: 'app-ventana-auxiliar-documentacion',
  templateUrl: './ventana-auxiliar-documentacion.component.html',
  styleUrls: ['./ventana-auxiliar-documentacion.component.css']
})
export class VentanaAuxiliarDocumentacionComponent implements OnInit {

  data: Array<any>;
  arrayDocumentos: DocumentoRequerido[];
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  datosSeleccionados: DocumentoRequerido[] = [];
  editDocumento: editarDocumentos;
  datosAdd: DocumentoRequerido[]=[];
  idProcedimiento: number;
  banderaBotonAnadir: Boolean;
  yaEsta: Boolean;



  displayedColumnsDoc: string[] = ['codigo', 'nombre', /*'estado',*/ 'descripcion', 'acciones'];

  dataSourceDocs = new MatTableDataSource<DocumentoRequerido>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private documentoService: DocumentoService,
    private notificationService: notificationService.NotificationService,
    private dialog: MatDialog,
    private utilityService: UtilityServiceService
  ) { }



  ngOnInit(): void { 
    this.getAllDocumentos()
    this.utilityService.customDocumentoAdd.subscribe(msg => {
      this.datosAdd = msg; 
    }) ;
    
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idProcedimiento = msg);  
  }

  getAllDocumentos(){
    this.documentoService.getAllDocumentos().subscribe((result: DocumentoRequerido[])=>{
      this.arrayDocumentos = DocumentoRequerido.fromJSON(result);

      if(this.arrayDocumentos != null){
        this.arrayDocumentos.sort(function(a,b){
          return ((a.nombre < b.nombre) ? -1: ((a.nombre > b.nombre) ? 1: 0));
        })
      }else{
        this.notificationService.success('No existe documento');
      }
    })  
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada;
    this.agregarDatoTabla();
    $("#mi_seleccion").val("0");
    this.verificarDatos();

    
    
  }

  agregarDatoTabla(){
    for(let i=0; i < this.arrayDocumentos.length; i++){
      if(this.arrayDocumentos[i].nombre == this.verSeleccion){
        if(!this.datosSeleccionados.includes(this.arrayDocumentos[i])){
          this.datosSeleccionados.push(this.arrayDocumentos[i]);
          this.dataSourceDocs = new MatTableDataSource(this.datosSeleccionados);
          this.dataSourceDocs.paginator = this.paginator;
          break;
        }
      }
    }
  }

  confirmacionLimpiar() {
    this.dialog
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

  limpiarLista(){
    this.datosSeleccionados = [];
    this.dataSourceDocs = new MatTableDataSource(this.datosSeleccionados);
    this.dataSourceDocs.paginator = this.paginator;
  }

  cerrarVentana(){
    this.dialog.open(ConfirmationDialogComponent, {
      data: `¿Seguro que desea SALIR de la ventana añadir documentos? puesto que si sale y tiene instrumentos en la vista previa estos no se añadirán y se borrará de la tabla?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if(confirmado){
        this.dialog.closeAll();
      }
    })
  }

  eliminarDato(documAeliminar: DocumentoRequerido){
    for(let i = 0; i<this.datosSeleccionados.length; i++){
      if(this.datosSeleccionados[i] == documAeliminar){
        this.datosSeleccionados.splice(i,1);
        this.dataSourceDocs = new MatTableDataSource(this.datosSeleccionados);
        this.dataSourceDocs.paginator = this.paginator;
        this.verificarDatos();
        break;
      } 
    }
  }

  addDocumento(){
    this.dialog.open(ConfirmationDialogComponent, {
      data: `¿Seguro que desea añadir todos los documentos que ha agregado en la tabla?`
    }).afterClosed()
    .subscribe((confirmado: Boolean) => {
      if(confirmado){
        for(let i=0; i<this.datosSeleccionados.length; i++){
          const resultado = this.datosAdd.find(documento => documento.codigoDocumento === this.datosSeleccionados[i].codigoDocumento);
           
          if(!resultado){
            this.editDocumento = new editarDocumentos(this.datosSeleccionados[i].id, this.idProcedimiento, this.datosSeleccionados[i].codigoDocumento, "PEND", this.datosSeleccionados[i].observacion);
            let res = this.documentoService.addDocumento(this.editDocumento).subscribe();
          }else{
            this.editDocumento = new editarDocumentos(resultado.id, this.idProcedimiento, resultado.codigoDocumento, "PEND", resultado.observacion);
            let res = this.documentoService.addDocumento(this.editDocumento).subscribe();
          }
          this.utilityService.changeDocumentoAdd(this.datosAdd);
        }
        this.utilityService.changeDocumentoAdd(this.datosAdd);
        this.dialog.closeAll();


      }
    });
  }

  verificarDatos(){
    if(this.datosSeleccionados.length > 0){
      this.banderaBotonAnadir=false;
    }else{
      this.banderaBotonAnadir=true;
    }
  }

  validarRepetido(seleccion: string):Boolean{
    for(let i=0; i<this.datosSeleccionados.length; i++){
      if(this.datosSeleccionados[i].nombre === seleccion){
        console.log("YA esta seleccionado este");
        return true;
      }
        console.log("Ok este se puede seleccionar!")
        return false;      
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  
}





