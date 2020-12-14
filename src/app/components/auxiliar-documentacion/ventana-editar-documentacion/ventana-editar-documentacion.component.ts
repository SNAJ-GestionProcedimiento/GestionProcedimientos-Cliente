import { Component, OnInit, Input } from '@angular/core';
import { DocumentoService } from 'src/_services/documentacion.service';
import { UtilityServiceService } from '../../../../_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoRequerido, editarDocumentos } from '../../../../_models/documento.model';
import { estadoDocClass, obtenerEstadoDoc } from '../../../../_models/documento-estado.model';

@Component({
  selector: 'app-ventana-editar-documentacion',
  templateUrl: './ventana-editar-documentacion.component.html',
  styleUrls: ['./ventana-editar-documentacion.component.css']
})

export class VentanaEditarDocumentacionComponent implements OnInit {

  constructor(
    private utilityService: UtilityServiceService,
    private documentoService: DocumentoService,
    private notificationService: notificationService.NotificationService,
    private dialog: MatDialog
  ) { }

  dateDocRecib: string;
  datosDocumento: DocumentoRequerido;
  estadosDoc: estadoDocClass[];
  idProcedimiento: number;
  editDocumentos: editarDocumentos;
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  custormertext: string;
  formData = new FormData();

  listaEsdadoDoc: estadoDocClass[] = [];

  ngOnInit(): void {
    this.utilityService.customEstadosDoc.subscribe(element => this.estadosDoc = element);
    this.utilityService.customIdAgendaProcedimiento.subscribe(element => this.idProcedimiento = element);
    this.utilityService.customDocumento.subscribe(element => {
      this.datosDocumento = element;
      this.hacerListaEstadosDoc();
      this.verSeleccion=this.datosDocumento.estado;
      this.custormertext=this.datosDocumento.observacion;
    })
  }

  keyPress(event: any){
    const pattern = /[0-9]/;
    let inputChat = String.fromCharCode(event.charCode);
    if(event.keyCode != 8 && !pattern.test(inputChat)){
      event.preventDefault();
    }
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada
  }

  cerrarVentana(){
    this.dialog.closeAll(); 
  }

  editar(){
    this.datosDocumento.estado = this.verSeleccion;
    let documentoEnviar = this.convertirEstadoSalida(this.datosDocumento);
    if(this.custormertext != "" && this.custormertext != " "){
      this.datosDocumento.observacion=this.custormertext;
    }else{
      this.notificationService.success('Campo observación no editado!');
    }
    this.editDocumentos = new editarDocumentos(this.datosDocumento.id, this.idProcedimiento, this.datosDocumento.codigoDocumento, this.datosDocumento.estado, this.datosDocumento.descripcion,this.datosDocumento.descripcion,this.datosDocumento.caduca,this.datosDocumento.nombre, this.datosDocumento.path,this.datosDocumento.fechaDocRecibido, this.datosDocumento.fechaVencimiento); 

    this.dateDocRecib = new Date().toISOString().split('T')[0];

    this.formData.append("id", this.editDocumentos.id.toString());
    this.formData.append("estado", this.editDocumentos.estado);
    this.formData.append("path",this.editDocumentos.path);
    this.formData.append("codigoDocumento", this.datosDocumento.codigoDocumento);
    this.formData.append("idAgendaProcedimiento", this.idProcedimiento.toString());
    this.formData.append("fechaVencimiento",this.dateDocRecib);
    this.formData.append("fechaDocRecibido",this.dateDocRecib)
    
    let res = this.documentoService.editarDocumentoServicio(this.formData).subscribe();

    if(res != null){
      this.convertirEstadoLleda(this.datosDocumento);
      this.notificationService.success('Documento '+this.datosDocumento.nombre.toString()+" editado satisfactoriamente");
      this.utilityService.changeDocumento(this.datosDocumento);
      this.cerrarVentana();
    }
  } 

  convertirEstadoLleda(documentoAcambiar) {
    for (let j = 0; j < this.estadosDoc.length; j++) {
      if (documentoAcambiar.estado == this.estadosDoc[j].valor) {
        documentoAcambiar.estado = this.estadosDoc[j].contenido;
      }
    }
  }

  convertirEstadoSalida(documentoAcambiar): DocumentoRequerido {
    for (let j = 0; j < this.estadosDoc.length; j++) {
      if (documentoAcambiar.estado == this.estadosDoc[j].contenido) {
        documentoAcambiar.estado = this.estadosDoc[j].valor; 
      }
    }
    return documentoAcambiar;
  }

  hacerListaEstadosDoc(){
    this.listaEsdadoDoc = [];
    for(let i = 1 ; i<this.estadosDoc.length; i++){
      console.log(this.estadosDoc[i].contenido);
      console.log();
      this.listaEsdadoDoc.push(this.estadosDoc[i]);    
    }
  }
}
