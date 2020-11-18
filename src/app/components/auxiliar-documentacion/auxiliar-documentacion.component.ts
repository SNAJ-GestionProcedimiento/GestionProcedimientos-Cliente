import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DocumentoRequerido} from '../../../_models/documento.model';
import { VentanaAuxiliarDocumentacionComponent } from '../ventana-auxiliar-documentacion/ventana-auxiliar-documentacion.component';
import { Procedimiento } from '../../../_models/procedimiento.model';
import { estadoDocClass, obtenerEstadoDoc } from '../../../_models/documento-estado.model';
import {DocumentoService} from '../../../_services/documentacion.service'
import * as notificationService from 'src/_services/notification.service';
import { estadoClass } from '../../../_models/modelInstrumento/instrumentos-equipos-estado.model';
import { element } from 'protractor';

@Component({
  selector: 'app-auxiliar-documentacion',
  templateUrl: './auxiliar-documentacion.component.html',
  styleUrls: ['./auxiliar-documentacion.component.css'],
  
})
export class AuxiliarDocumentacionComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";
  public tituloTabla = "Documentos";
  mensajeDeNotificacion="";
  estados: estadoDocClass[];
  arrayDocs: DocumentoRequerido[]=[];
  
  dataDocs = null;
  parrafo=""
  estadosDoc: estadoDocClass[];
  varDocumentosRequeridos: DocumentoRequerido[];

  displayedColumnsDoc: string[] = ['codigoDocumento', 'nombre', 'descripcion', 'caduca', 'estado', 'fechaVencimiento' , 'archivo', 'observacion','acciones'];

  dataDocumentosRequeridos: MatTableDataSource<DocumentoRequerido>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,   
    private documentosService: DocumentoService,
    private notificationService: notificationService.NotificationService

    ) {   }

    ngOnInit(): void {
      this.estadosDoc = obtenerEstadoDoc.getEstadoObtenido();
      //console.log("Codigo de procedimiento desde documentos: "+this.codigoProcedimientoObtenido)
    }

 
  /*public listarDocumentosRequeridos(){
    console.log("El codigo desde documentacion es: "+this.codigoProcedimientoObtenido);
    this.documentosService.getDocumentoRequerido(parseInt(this.codigoProcedimientoObtenido)).subscribe((result: DocumentoRequerido[]) => {
      this.arrayDocs=DocumentoRequerido.fromJSON(result);
      
      console.log("Documentos por codigo agenda:"+JSON.stringify(this.arrayDocs));
     
      if (this.arrayDocs != null) {
         
        this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocs);
        this.dataDocumentosRequeridos.paginator = this.paginator;
      } else {
        this.parrafo = "No hay documentos requeridos para el procedimiento seleccionado";
      }
    })
  }*/

  public validarEstados(){
    for (let i = 0; i < this.arrayDocs.length; i++) {
      if(this.arrayDocs[i].estado == 'null'){
        for (let j = 0; j < this.estadosDoc.length; j++) {
          this.arrayDocs[i].estado = "Pendiente";
        } 
      }
    }
  }
  


  public listarDocumentosPorCodigoModalidad(){
    this.documentosService.getDocumentosProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: DocumentoRequerido[]) => {
      this.arrayDocs=result;
      this.parrafo="";
      this.validarEstados();

      if (this.arrayDocs != null) {
        this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocs);
        this.dataDocumentosRequeridos.paginator = this.paginator;
      } else {
        this.parrafo = "No hay documentos requeridos para el procedimiento seleccionado";
        this.notificationService.success(this.parrafo);
      }


    })
  }

 

  ngAfterViewInit() {
  }

  /*columnas = [
    {titulo: 'Código', columnName: 'cod'},
    {titulo: 'Nombre', columnName: 'nom'},
    {titulo: 'Descipción', columnName: 'desc'},
    {titulo: 'Caduca', columnName: 'caduc'},
    //{titulo: 'Estado', columnName: 'est'},
    {titulo: 'Archivo', columnName: 'path'},
    {titulo: 'Observación', columnName: 'observ'},
   ];*/

   /*asignarEstadoDocumentos(arrayDocumentacion){
     for (let i = 0; i < arrayDocumentacion.length; i++) {
       for (let j = 0; j < this.estados.length; j++) {
         
         
       }

       
     }

   }*/
   
  

  openAgregarDocu() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.open(VentanaAuxiliarDocumentacionComponent, dialogoConfig);
    
  }

  generarRecibido(){
    alert("generando recibido . . .");
  }

  
  openAgregarDocumento(){
    //const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    

   /* const dialogoConfig= this.dialog.open(VentanaAuxiliarDocumentacionComponent,{
      data: new DocumentoRequerido()
    });*/

  ;
  }

 
  




}

/*export class Documento{
  constructor(public posicion: number, public codigo: number, public nombre: string, public estado: string, public archivo: string, public observacion: string, public acciones: string){
  }
}*/

/*const ELEMENT_DATA_DOC: Documentos[] = [
  {posicion: 1, codigo: 1213124, nombre: 'Orden apoyo', estado: 'Disponible', archivo: 'Docu', observacion: 'Asdasda', acciones: 'editar'},
  
  {posicion: 2, codigo: 13453124, nombre: 'Constancia', estado: 'Pendiente', archivo: 'Docu', observacion: 'gdfgdfgdf', acciones: 'editar'}
];*/