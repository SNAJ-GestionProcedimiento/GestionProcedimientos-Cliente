import { Component, OnInit } from '@angular/core';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from "@angular/material/dialog";
import { editarEpecialidadesRequeridas, especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';
import { EspecilidadRequeridaService } from 'src/_services/especilidad-requerida.service';

@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.component.html',
  styleUrls: ['./editar-especialidad.component.css']
})
export class EditarEspecialidadComponent implements OnInit {

  datosEspecialidad: especialidadesRequeridas;
  especialidadEditable: editarEpecialidadesRequeridas;
  estados: estadoClass[];
  idProcedimiento: string;
  opcionSeleccionado: string = '0';
  verSeleccion = '';
  registroMedico: string;
  identificacionEspecialista: string;
  nombreEspecialista: string;

  listaEstado: estadoClass[] = [];

  constructor(private utilityService: UtilityServiceService, private notificationService: notificationService.NotificationService, 
    private dialog: MatDialog, private serviceEspecialidadRequerida: EspecilidadRequeridaService) { }

  ngOnInit(): void {
    this.utilityService.customEstados.subscribe(msg => this.estados = msg);
    this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);
    this.utilityService.customEspecialidad.subscribe(msg => {
      this.datosEspecialidad = msg;
      this.hacerListaEstados();
      this.verSeleccion = this.datosEspecialidad.estado;
    });
  }

  editar() {
    this.datosEspecialidad.estado=this.verSeleccion;
    let especialistaEnviar= this.convertirEstadoSalida(this.datosEspecialidad);
    this.datosEspecialidad.registroMedico=this.registroMedico;
    this.datosEspecialidad.identificacion=this.identificacionEspecialista;
    this.datosEspecialidad.nombreEspecialista=this.nombreEspecialista;
    this.especialidadEditable=new editarEpecialidadesRequeridas(especialistaEnviar.id, especialistaEnviar.codigoEspecialidad, especialistaEnviar.nombreEspecialidad, especialistaEnviar.registroMedico, especialistaEnviar.identificacion,especialistaEnviar.nombreEspecialista, especialistaEnviar.estado, parseInt(this.idProcedimiento));
    let res = this.serviceEspecialidadRequerida.editarEspecialidad(this.especialidadEditable).subscribe();
    if (res != null) {
      //this.convertirEstadoLleda(this.datosInstrumento);
      this.notificationService.success('Se edito la especialidad con código: ' + this.datosEspecialidad.codigoEspecialidad.toString());
      console.log("cambio");
      this.utilityService.changeEspecialidad(this.datosEspecialidad);
      this.cerrarVentana();
    } else {
      console.log("no cambio");
    }

    this.cerrarVentana();
  }

  cerrarVentana() {
    this.dialog.closeAll();
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
  }

  hacerListaEstados() {
    this.listaEstado = [];
    for (let i = 0; i < this.estados.length; i++) {
      if (this.estados[i].contenido != this.datosEspecialidad.estado) {
        console.log("entro al if de hacer listados con el estado: "+this.estados[i].contenido);
        this.listaEstado.push(this.estados[i]);
      }
    }
  }

  convertirEstadoSalida(especialistaAcambiar): especialidadesRequeridas {
    for (let j = 0; j < this.estados.length; j++) {
      //console.log("instrment que llego: "+instrumentoAcambiar.estado+" estado: "+this.estados[j].contenido);
      if (especialistaAcambiar.estado == this.estados[j].contenido) {
        //console.log("entro en salida");
        especialistaAcambiar.estado = this.estados[j].valor;
      }
    }
    return especialistaAcambiar;
  }


}
