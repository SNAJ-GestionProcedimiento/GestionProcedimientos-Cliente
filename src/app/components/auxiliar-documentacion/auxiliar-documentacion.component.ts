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

@Component({
  selector: 'app-auxiliar-documentacion',
  templateUrl: './auxiliar-documentacion.component.html',
  styleUrls: ['./auxiliar-documentacion.component.css'],
  
})
export class AuxiliarDocumentacionComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";
  mensajeDeNotificacion="";
  estados: estadoDocClass[];
  arrayDocs: DocumentoRequerido[]=[];

   /*docs: Documento[] = [new Documento(1, 0, '', '', '','',''), new Documento(2, 0, '', '', '','',''), new Documento(3, 0, '', '', '','','')];*/
  
  dataDocs = null;
  parrafo=""
  estadosDoc: estadoDocClass[];
  varDocumentosRequeridos: DocumentoRequerido[];

  displayedColumnsDoc: string[] = ['cod', 'nom', 'desc', 'caduc', 'est', 'path', 'observ', 'acciones'];

  dataDocumentosRequeridos: MatTableDataSource<DocumentoRequerido>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,   
    private documentosService: DocumentoService,
    private notificationService: notificationService.NotificationService

    ) {   }

    ngOnInit(): void {
      this.estadosDoc = obtenerEstadoDoc.getEstadoObtenido();
      console.log("Codigo de procedimiento desde documentos: "+this.codigoProcedimientoObtenido)
    }

    result2: DocumentoRequerido;


  public listarDocumentosRequeridos(){
    console.log("El codigo desde documentacion es: "+this.codigoProcedimientoObtenido);
    this.documentosService.getDocumentoRequerido(parseInt(this.codigoProcedimientoObtenido)).subscribe((result: DocumentoRequerido[]) => {
      this.arrayDocs=DocumentoRequerido.fromJSON(result);
      
      console.log("Documentos por codigo agenda: "+this.arrayDocs);

      if (this.arrayDocs != null) {
        
        this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocs);
      } else {
        this.parrafo = "No hay documentos requeridos para el procedimiento seleccionado";
      }
    })
  }

  public listarDocumentosPorCodigoModalidad(){
    console.log("Estoy dentro de listar documentos desde component documentos");
    this.documentosService.getDocumentosProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: DocumentoRequerido[]) => {
      this.arrayDocs=result;
      console.log("ArraryDocs: v")
      console.log(this.arrayDocs);
      this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocs);


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
    

    const dialogoConfig= this.dialog.open(VentanaAuxiliarDocumentacionComponent,{
      data: new DocumentoRequerido()
    });

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