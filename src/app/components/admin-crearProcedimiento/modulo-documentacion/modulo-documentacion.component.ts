import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentoRequerido, editarDocumentos } from 'src/_models/documento.model';
import { DocumentoService } from 'src/_services/documentacion.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-modulo-documentacion',
  templateUrl: './modulo-documentacion.component.html',
  styleUrls: ['./modulo-documentacion.component.css']
})
export class ModuloDocumentacionComponent implements OnInit {

  data: Array<any>;
  arrayDocumentos: DocumentoRequerido[];
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  datosSeleccionados: DocumentoRequerido[] = [];
  editDocumento: editarDocumentos;
  datosAdd: DocumentoRequerido[]=[];
  idProcedimiento: number;



  displayedColumnsDoc: string[] = ['codigo', 'nombre', 'descripcion', 'acciones'];

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
      $("#mi_select").val("0");
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
          data: `¿Seguro que desea eliminar TODOS los documentos que ha agregado en la tabla?`
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

    eliminarDato(documAeliminar: DocumentoRequerido){
      this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea ELIMINAR el documento de la lista?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for(let i = 0; i<this.datosSeleccionados.length; i++){
            if(this.datosSeleccionados[i] == documAeliminar){
              this.datosSeleccionados.splice(i,1);
              this.dataSourceDocs = new MatTableDataSource(this.datosSeleccionados);
              this.dataSourceDocs.paginator = this.paginator;
            } 
          }
        }
      });
      
    }

    /*addDocumento(){
      this.dialog.open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea añadir todos los documentos que ha agregado en la tabla?`
      }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if(confirmado){
          for(let i=0; i<this.datosSeleccionados.length; i++){
            const resultado = this.datosAdd.find(documento => documento.codigoDocumento === this.datosSeleccionados[i].codigoDocumento);

            if(!resultado){
              this.editDocumento = new editarDocumentos(this.datosSeleccionados[i].id, this.idProcedimiento, this.datosSeleccionados[i].codigoDocumento, this.datosSeleccionados[i].estado, this.datosSeleccionados[i].observacion);
              
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
    }*/

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getDocumentosRequeridos():DocumentoRequerido[]{
    return this.datosSeleccionados;
  }
}
