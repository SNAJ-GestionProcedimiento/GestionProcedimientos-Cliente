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
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { element } from 'protractor';
import { VentanaEditarDocumentacionComponent } from './ventana-editar-documentacion/ventana-editar-documentacion.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-auxiliar-documentacion',
  templateUrl: './auxiliar-documentacion.component.html',
  styleUrls: ['./auxiliar-documentacion.component.css'],
  
})
export class AuxiliarDocumentacionComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";
  public tituloTabla = "Documentos";
  public idProcedimientoModalidad: string;

  mensajeDeNotificacion="";
  estados: estadoDocClass[];
  //arrayDocs: DocumentoRequerido[]=[];
  documentosAsociadosAgenda: DocumentoRequerido[];
  arrayDocumentos: DocumentoRequerido[];

  documentoEditable: DocumentoRequerido;

  
  dataDocs = null;
  parrafo="";
  estadosDoc: estadoDocClass[];
  varDocumentosRequeridos: DocumentoRequerido[];
  idProcedimiento: string;
  idAgendaProcedimiento: number;
  idModalidad: string;
  datosAddTablaDoc: DocumentoRequerido[] = [];

  displayedColumnsDoc: string[] = ['codigoDocumento', 'nombre', 'descripcion', /*'caduca',*/ 'estado', /*'fechaVencimiento' , 'path',*/ 'observacion','acciones'];

  dataDocumentosRequeridos: MatTableDataSource<DocumentoRequerido>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,   
    private documentosService: DocumentoService,
    private notificationService: notificationService.NotificationService,
    private utilityService: UtilityServiceService

    ) {   }

    ngOnInit(): void {
       //Agenda, modalidad y procedimiento
       this.utilityService.customIdAgendaProcedimiento.subscribe(element => this.idAgendaProcedimiento = element);
       this.utilityService.customIdModalidad.subscribe(element => this.idModalidad = element);
       this.utilityService.customIdProcedimientoModalidad.subscribe(msg => this.idProcedimientoModalidad = msg);
       this.utilityService.customIdProcedimiento.subscribe(element => this.idProcedimiento = element); 

      

      //EstadosDoc
      
      this.utilityService.customEstadosDoc.subscribe(element => this.estadosDoc = element);
      this.estadosDoc = obtenerEstadoDoc.getEstadoObtenido();   
      this.utilityService.customDocumento.subscribe(element => {
        this.documentoEditable = element;
      });
      //CHANGE
      this.utilityService.changeEstadoDocumento(this.estadosDoc);  
      this.utilityService.customDocumentoAdd.subscribe(element => {
        this.datosAddTablaDoc = element;
        if(this.idProcedimiento != ""){

          this.listarDocumentos();
        }
      });

         

    

    }

    listarDocumentos(){
      this.parrafo = "";
      this.documentosService.getDocumentoRequerido(this.idAgendaProcedimiento).subscribe((rest: DocumentoRequerido[]) => {
        this.documentosAsociadosAgenda  = rest;
        if(this.documentosAsociadosAgenda != null){
          this.convertirEstadoLleda(this.documentosAsociadosAgenda);
          this.listarDocumentosRequeridos();


        }else{
          this.documentosAsociadosAgenda = [];
          this.parrafo = "No hay documentos asociados al procedimiento";
          this.notificationService.success('No hay documentos asociados al procedimiento'); 
          
        }

        this.dataDocumentosRequeridos = new MatTableDataSource(this.documentosAsociadosAgenda);
        this.dataDocumentosRequeridos.paginator = this.paginator;
      })
    }

    listarDocumentosRequeridos(){ 
      if(parseInt(this.idModalidad) != null){
        this.documentosService.getDocumentosProcedimiento(parseInt(this.idProcedimiento), parseInt(this.idModalidad)).subscribe(
          (result: DocumentoRequerido[]) => this.documentosAsociadosAgenda = result);
      }else{
        this.notificationService.success('No existe modalidad!!');
      }   
    }

    editarDocumentoRequerido(documento: DocumentoRequerido): void{
      this.documentoEditable = documento;
      this.utilityService.changeDocumento(this.documentoEditable);
      const dialogoConfig = new MatDialogConfig();
      dialogoConfig.autoFocus = true;
      dialogoConfig.width = "60%";
      this.dialog.open(VentanaEditarDocumentacionComponent, dialogoConfig);

    }

    validarDocumentoRequerido(documento: DocumentoRequerido): Boolean{
      let res = false;
      for (let i = 0; i < this.documentosAsociadosAgenda.length; i++) {
        if(this.documentosAsociadosAgenda[i].nombre == documento.nombre){
          res = true;
          break;
        }        
      }
      return res;
    }
 

  public validarEstados(){
    for (let i = 0; i < this.documentosAsociadosAgenda.length; i++) {
      if(this.documentosAsociadosAgenda[i].estado == 'null'){
        for (let j = 0; j < this.estadosDoc.length; j++) {
          this.documentosAsociadosAgenda[i].estado = "Pendiente";
        } 
      }
    }
  }

  public listarDocumentosPorCodigoModalidad(){
    this.documentosService.getDocumentosProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: DocumentoRequerido[]) => {
      this.documentosAsociadosAgenda=result;
      this.parrafo="";
      this.validarEstados();

      if (this.documentosAsociadosAgenda != null) {
        this.dataDocumentosRequeridos = new MatTableDataSource(this.documentosAsociadosAgenda);
        this.dataDocumentosRequeridos.paginator = this.paginator;
        this.parrafo = "Documentos requeridos cargados exitosamente";
      } else {
        this.parrafo = "No hay documentos requeridos para el procedimiento seleccionado";
        this.notificationService.success(this.parrafo);
      }


    })
  }

  eliminarDatoDoc(Instrument: DocumentoRequerido) {
    this.dialog.open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar el documento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.documentosAsociadosAgenda.length; i++) {
            if (this.documentosAsociadosAgenda[i].nombre == Instrument.nombre) {
              this.documentosService.deleteDocumento(this.documentosAsociadosAgenda[i].id).subscribe();
              this.listarDocumentos();
              this.listarDocumentosRequeridos();
              break;
            }
          }
        }
        this.listarDocumentos();
        this.listarDocumentosRequeridos();
      });
  }

  convertirEstadoLleda(documentoAcambiar){
    for(let i = 0 ; i<documentoAcambiar.length; i++){
      for(let j = 0; j < this.estadosDoc.length; j++){
        if(documentoAcambiar[i].estado == this.estadosDoc[j].valor){
          documentoAcambiar[i].estado = this.estadosDoc[j].contenido;
        }
      }
    }
  }

  convertirEstadoSalida(documentoAcambiar): DocumentoRequerido{
    for (let j = 0; j < this.estadosDoc.length; j++) {
      if (documentoAcambiar.estado == this.estadosDoc[j].contenido) {
        documentoAcambiar.estado = this.estadosDoc[j].valor;
      }
    }
    return documentoAcambiar;
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