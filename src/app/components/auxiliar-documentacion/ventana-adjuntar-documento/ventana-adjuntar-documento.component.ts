import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoService } from '../../../../_services/documentacion.service';
import { editarDocumentos, DocumentoRequerido } from '../../../../_models/documento.model';
import { UtilityServiceService } from '../../../../_services/utility-service.service';
import { NotificationService } from '../../../../_services/notification.service';
import * as notificationService from 'src/_services/notification.service';
import { VentanaAuxiliarDocumentacionComponent } from '../../ventana-auxiliar-documentacion/ventana-auxiliar-documentacion.component';
import { DateHelper } from '../../../../_helpers/date.helper';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-ventana-adjuntar-documento',
  templateUrl: './ventana-adjuntar-documento.component.html',
  styleUrls: ['./ventana-adjuntar-documento.component.css']
})
export class VentanaAdjuntarDocumentoComponent implements OnInit {


  idAgendaProcedimiento: number;
  public tituloVentana = "";
  datosAdd: DocumentoRequerido[]=[];
  arrayRequeridos: DocumentoRequerido[] = [];
  todosLosDocumentos: DocumentoRequerido[]=[];
  documentoAdjunt: editarDocumentos;
  archivoDocum: File;
  dateDocRecib: string;
  formData: FormData;
  posicionClickAdjuntar: string;

  constructor(
    private documentoService: DocumentoService,
    private dialog: MatDialog,
    private utilityService: UtilityServiceService,
    private notificationService: notificationService.NotificationService, 
  ) { }

  ngOnInit(): void {
   
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idAgendaProcedimiento = msg);
    this.documentoService.getDocumentoRequerido(this.idAgendaProcedimiento).subscribe((result: DocumentoRequerido[]) => {
      this.arrayRequeridos = DocumentoRequerido.fromJSON(result);
    });
    this.utilityService.customDocumentoAdd.subscribe(msg => {
      this.datosAdd = msg;
    });
    this.agregarDocumentos();
    
  }
  
  duplicados(){
    let hash = {};
    this.todosLosDocumentos = this.todosLosDocumentos.filter(o => hash[o.codigoDocumento] ? false : hash[o.codigoDocumento] = true);
  }
  
  agregarDocumentos(){
    this.duplicados();
    for(let i=0; i<this.arrayRequeridos.length; i++){
      this.todosLosDocumentos.push(this.arrayRequeridos[i]);
    }
    if(this.datosAdd.length>0){
      for(let i=0; i<this.arrayRequeridos.length; i++){
        this.todosLosDocumentos.push(this.datosAdd[i]);
      }
    }
  }

  cerrarVentana(){
    this.dialog.closeAll();
  }

  crearDocumentoAdjuntar(){

    this.utilityService.customPosicionAdjuntar.subscribe(msg =>{
      this.posicionClickAdjuntar = msg;
    });

    this.todosLosDocumentos = this.arrayRequeridos;

    for (let i = 0; i < this.todosLosDocumentos.length; i++) {
      if(this.posicionClickAdjuntar === this.todosLosDocumentos[i].codigoDocumento){
        this.documentoAdjunt = new editarDocumentos(this.todosLosDocumentos[i].id,this.idAgendaProcedimiento, this.posicionClickAdjuntar, this.todosLosDocumentos[i].estado, this.todosLosDocumentos[i].observacion, this.todosLosDocumentos[i].descripcion, this.todosLosDocumentos[i].caduca, this.todosLosDocumentos[i].nombre, this.archivoDocum, this.dateDocRecib, this.todosLosDocumentos[i].fechaVencimiento);
      }
    }
 }

  uploadFile(event:any) {
    
    let file = event.target.files[0];
    let fileName = file.name;
    this.archivoDocum = file;
    this.formData = new FormData();
    console.log(file)
    console.log(fileName);
    this.crearDocumentoAdjuntar();
    this.dateDocRecib = new Date().toISOString().split('T')[0];

    this.formData.append("id", this.documentoAdjunt.id.toString());
    this.formData.append("estado", this.documentoAdjunt.estado);
    this.formData.append("path",this.archivoDocum);
    this.formData.append("codigoDocumento", this.posicionClickAdjuntar);
    this.formData.append("idAgendaProcedimiento", this.idAgendaProcedimiento.toString());
    this.formData.append("fechaVencimiento",this.dateDocRecib);
    this.formData.append("fechaDocRecibido",this.dateDocRecib)
  }

  enviarAdjunto(){
    this.documentoService.editarDocumentoServicio(this.formData).subscribe();
    this.notificationService.success("Documento subido satisfactoriamente!!!");
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}