import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoService } from '../../../../_services/documentacion.service';
import { editarDocumentos, DocumentoRequerido } from '../../../../_models/documento.model';
import { UtilityServiceService } from '../../../../_services/utility-service.service';
import { NotificationService } from '../../../../_services/notification.service';
import * as notificationService from 'src/_services/notification.service';
import { VentanaAuxiliarDocumentacionComponent } from '../../ventana-auxiliar-documentacion/ventana-auxiliar-documentacion.component';

@Component({
  selector: 'app-ventana-adjuntar-documento',
  templateUrl: './ventana-adjuntar-documento.component.html',
  styleUrls: ['./ventana-adjuntar-documento.component.css']
})
export class VentanaAdjuntarDocumentoComponent implements OnInit {

  documentoAdjunto: DocumentoRequerido;  
  idProcedimiento: number;
  //arrayDocumentos: DocumentoRequerido[];


  constructor(
    private documentoService: DocumentoService,
    private dialog: MatDialog,
    private utilityService: UtilityServiceService,
    private notificationService: notificationService.NotificationService, 
  


  ) { }

  ngOnInit(): void {
    //this.ventanaAuxiliarDocu.getAllDocumentos();
    //this.ventanaAuxiliarDocu.arrayDocumentos;
    //this.ventanaAuxiliarDocu.arrayDocumentos.forEach(element => {
      //console.log(element);
    //});
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    console.log("DESDE ADJUNTAR!!!");
    console.log(this.idProcedimiento);

    
  }

  cerrarVentana(){
    this.dialog.closeAll();
  }

  onArchivoChange(event: any){
    //this.documentoService.getAllDocumentos();
    //this.ventanaAuxiliarDocu.arrayDocumentos[0].path = event.target.files[0];

  }

  
  enviarArchivoAdjunto(){

    
    

  }
}
