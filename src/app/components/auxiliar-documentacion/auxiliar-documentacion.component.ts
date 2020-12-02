import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DocumentoRequerido, editarDocumentos } from '../../../_models/documento.model';
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

  @Input() codigoProcedimientoObtenido: String="";
  public tituloTabla = "Documentacion";
  parrafo="";
  idProcedimiento: string;
  idAgendaProcedimiento: number;

  editDocumento: editarDocumentos;
  estadosDoc: estadoDocClass[];
  arrayDocumentos: DocumentoRequerido[];
  documentoEditable: DocumentoRequerido;
  datosAddTablaDoc: DocumentoRequerido[] = [];
  documentosRequeridos: DocumentoRequerido[] = [];
  idModalidad: string='';
  idProcedimientoModalidad: string='';
  objBanderaRequerido: Boolean;
  banderaBotonAnadir: Boolean;

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

      this.utilityService.customDocumento.subscribe(msg => {
        this.documentoEditable = msg;
      });

      this.utilityService.customBanderaRequerido.subscribe(msg => {
        this.objBanderaRequerido = msg;
        if (this.objBanderaRequerido == true) {
          if (this.idProcedimiento != "") {
            if (this.idModalidad != ""){
              this.listarDocumentosRequeridos();
            }
          }
        }
      });

      this.utilityService.customBanderaBotonAnadir.subscribe(msg => this.banderaBotonAnadir=msg);

      this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);

      this.utilityService.customEstadosDoc.subscribe(msg => this.estadosDoc = msg);

      this.estadosDoc = obtenerEstadoDoc.getEstadoObtenido();

      this.utilityService.changeEstadoDocumento(this.estadosDoc);

      this.utilityService.customDocumentoAdd.subscribe(msg => {
        this.datosAddTablaDoc = msg;
        if(this.idProcedimiento != ""){
          this.listarDocumentos();
        }
      });

      this.utilityService.customIdModalidad.subscribe(msg => this.idModalidad = msg);

      this.utilityService.customIdAgendaProcedimiento.subscribe(msg => {
        this.idAgendaProcedimiento = msg;
        if(this.idProcedimiento != ""){
          this.listarDocumentos();
        }
      });


    }

    listarDocumentos(){
      this.parrafo = "";
      this.documentosService.getDocumentoRequerido(this.idAgendaProcedimiento).subscribe((result: DocumentoRequerido[]) => {
        this.arrayDocumentos = DocumentoRequerido.fromJSON(result);

        if(this.arrayDocumentos != null){
          this.parrafo = "";
          this.convertirEstadoLleda(this.arrayDocumentos);
          this.listarDocumentosRequeridos();
        }else{
          this.arrayDocumentos = [];
          this.parrafo = "No hay documentos asociados al procedimiento";
          this.notificationService.warn('No hay Documentos asociados al procedimiento');
        }
        this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocumentos);
        this.dataDocumentosRequeridos.paginator = this.paginator;
      });

      console.log("Agenda procedimiento creado : "+this.idAgendaProcedimiento);

    }

    listarDocumentosRequeridos(){ 
      if(parseInt(this.idModalidad) != null){
        this.documentosRequeridos = [];
        this.documentosService.getDocumentosProcedimiento(parseInt(this.idProcedimiento), parseInt(this.idModalidad)).subscribe(
          (result: DocumentoRequerido[]) => {
            this.documentosRequeridos = result;

            if(this.objBanderaRequerido == true){
              for(let i = 0; i < this.documentosRequeridos.length; i++){
                this.documentosRequeridos[i].estado="";
              }
              this.dataDocumentosRequeridos = new MatTableDataSource(this.documentosRequeridos);
              this.dataDocumentosRequeridos.paginator = this.paginator;
            }
          });
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
      for (let i = 0; i < this.documentosRequeridos.length; i++) {
        if(this.documentosRequeridos[i].nombre == documento.nombre){
          res = true;
          break;
        }        
      }
      return res;
    }
 

  public validarEstados(){
    for (let i = 0; i < this.documentosRequeridos.length; i++) {
      if(this.documentosRequeridos[i].estado == 'null'){
        for (let j = 0; j < this.estadosDoc.length; j++) {
          this.documentosRequeridos[i].estado = "Pendiente";
        } 
      }
    }
  }

  public listarDocumentosPorCodigoModalidad(){
    this.documentosService.getDocumentosProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: DocumentoRequerido[]) => {
      this.arrayDocumentos=result;
      this.parrafo="";
      this.validarEstados();

      if (this.arrayDocumentos != null) {
        this.dataDocumentosRequeridos = new MatTableDataSource(this.arrayDocumentos);
        this.dataDocumentosRequeridos.paginator = this.paginator;
        this.parrafo = "Documentos requeridos cargados exitosamente";
      } else {
        this.parrafo = "No hay documentos requeridos para el procedimiento seleccionado";
        this.notificationService.success(this.parrafo);
      }


    })
  }

  eliminarDatoDoc(documAeliminar: DocumentoRequerido) {
    this.dialog.open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar el documento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.arrayDocumentos.length; i++) {
            if (this.arrayDocumentos[i].nombre == documAeliminar.nombre) {
              this.documentosService.deleteDocumento(this.arrayDocumentos[i].id).subscribe();
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
 

  openAgregarDocu() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.datosAddTablaDoc = this.arrayDocumentos;
    this.utilityService.changeDocumentoAdd(this.datosAddTablaDoc);
    this.dialog.open(VentanaAuxiliarDocumentacionComponent, dialogoConfig);
    
  }

  validarAcuse(){
    if(this.idAgendaProcedimiento != 0){
      this.generarRecibido();
    }else{
      this.parrafo = "No existe un procedimiento creado!!";
      this.notificationService.warn(this.parrafo);
      
    }
  }

  generarRecibido(){

    this.documentosService.generarAcuseRecibido(this.idAgendaProcedimiento).subscribe(data => {

        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      
    });
    
  }
 
  ngOnDestroy(): void{
  
  }




}
