import { Component, OnInit } from '@angular/core';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { editInstrumentosEquipos, InstrumentosEquipos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';
import { InstrumentosEquiposService } from 'src/_services/serviciosInstrumentos/instrumentos-equipos.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-ventana-editar-instrumento-equipo',
  templateUrl: './ventana-editar-instrumento-equipo.component.html',
  styleUrls: ['./ventana-editar-instrumento-equipo.component.css']
})
export class VentanaEditarInstrumentoEquipoComponent implements OnInit {


  constructor(private utilityService: UtilityServiceService, private serviceIntrumentosEquipos: InstrumentosEquiposService, private notificationService: notificationService.NotificationService, 
    private dialog: MatDialog) {
    }
  datosInstrumento: InstrumentosEquipos;
  estados: estadoClass[];
  idProcedimiento: string;
  editInstrument: editInstrumentosEquipos;  //variable utilizada para editar los instrumentos
  opcionSeleccionado: string = '0';
  verSeleccion = '';
  customertext: number=0;
 
  listaEstado: estadoClass[] = [];

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => this.estados = msg);
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    this.utilityService.customInstrumento.subscribe(msg => {
      this.datosInstrumento = msg
      this.convertirEstadoLleda(this.datosInstrumento);
      this.hacerListaEstados();
      this.verSeleccion = this.datosInstrumento.estado;
      this.customertext=this.datosInstrumento.cantidad;
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
  }

  cerrarVentana() {
    this.dialog.closeAll();
  }

  editar() {
    this.datosInstrumento.estado = this.verSeleccion;
    let instrumetEnviar = this.convertirEstadoSalida(this.datosInstrumento);
    //console.log("idProcedimiento que llega a editar: " + this.idProcedimiento+" cantidad obtenida: "+this.customertext);
    if (this.customertext.toString()!="" && this.customertext.toString()!=" ") {
      this.datosInstrumento.cantidad=this.customertext;
    }else{
      this.notificationService.success('Se tomo la cantidad con la que estaba el instrumento o equipo');
    }
    this.editInstrument = new editInstrumentosEquipos(this.datosInstrumento.id, parseInt(this.idProcedimiento), this.datosInstrumento.codigoEquipo.toString(), instrumetEnviar.estado, this.datosInstrumento.cantidad);
    let res = this.serviceIntrumentosEquipos.editarInstrumentoEquipo(this.editInstrument).subscribe();
    if (res != null) {
      this.convertirEstadoLleda(this.datosInstrumento);
      this.notificationService.success('Se edito el instrumento con código: ' + this.datosInstrumento.codigoEquipo.toString());
      console.log("cambio");
      this.utilityService.changeIntrumento(this.datosInstrumento);
      this.cerrarVentana();
    } else {
      console.log("no cambio");
    }
  }
  convertirEstadoLleda(instrumentoAcambiar) {
    for (let j = 0; j < this.estados.length; j++) {
      if (instrumentoAcambiar.estado == this.estados[j].valor) {
        instrumentoAcambiar.estado = this.estados[j].contenido;
      }
    }
  }

  convertirEstadoSalida(instrumentoAcambiar): InstrumentosEquipos {
    for (let j = 0; j < this.estados.length; j++) {
      //console.log("instrment que llego: "+instrumentoAcambiar.estado+" estado: "+this.estados[j].contenido);
      if (instrumentoAcambiar.estado == this.estados[j].contenido) {
        //console.log("entro en salida");
        instrumentoAcambiar.estado = this.estados[j].valor;
      }
    }
    return instrumentoAcambiar;
  }

  hacerListaEstados() {
    this.listaEstado = [];
    for (let i = 0; i < this.estados.length; i++) {
      if (this.estados[i].contenido != this.datosInstrumento.estado) {
        this.listaEstado.push(this.estados[i]);
      }
    }
  }
}
