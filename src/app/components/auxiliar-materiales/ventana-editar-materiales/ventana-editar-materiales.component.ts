import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from '../../../../_services/utility-service.service';
import { MaterialesService } from '../../../../_services/materiales.service';
import * as notificationService from 'src/_services/notification.service';
import { MatDialog } from "@angular/material/dialog";
import { editarMateriales, MaterialRequerido } from '../../../../_models/material.model';
import { estadoMatClass } from 'src/_models/materiales-estado.model';
import { estadoClass } from '../../../../_models/modelInstrumento/instrumentos-equipos-estado.model';
import { Validators } from '@angular/forms';
import { element } from 'protractor';
import { obtenerEstadoMat } from '../../../../_models/materiales-estado.model';

@Component({
  selector: 'app-ventana-editar-materiales',
  templateUrl: './ventana-editar-materiales.component.html',
  styleUrls: ['./ventana-editar-materiales.component.css']
})
export class VentanaEditarMaterialesComponent implements OnInit {

  constructor(
    private utilityService: UtilityServiceService, 
    private serviceMateriales: MaterialesService, 
    private notificationService: notificationService.NotificationService, 
    private dialog: MatDialog) { }

  datosMateriales: MaterialRequerido;
  public estadosMat: estadoMatClass[];
  idProcedimiento: number;
  materialEditar: editarMateriales;
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  customertext: number=0;
  fechaSoliciudEdit: string;
  fechaComproEdid: string;
  fechaLlegaEdid: string;
  casaMedicaEdit: string; 
  unidadDeMedida: string;

  public listaEstadosMat: estadoMatClass[] = [];
  
  todaySoli: string;
  todayCompro: string;
  todayLlegada: string;

 
  ngOnInit(): void {  

    console.log("ESTADOS Mate ON INIT: !! "+this.estadosMat);
    this.utilityService.customIdAgendaProcedimiento.subscribe(element => this.idProcedimiento = element);


    this.utilityService.customEstadosMat.subscribe(element => {
      this.estadosMat 
    }); 

    this.estadosMat = obtenerEstadoMat.getEstadoObtenidoMateriales();
    
    this.utilityService.customMaterial.subscribe(element => {
      this.datosMateriales = element;
      this.hacerListaEstadosMat();
      this.verSeleccion = this.datosMateriales.estado;
      this.customertext=this.datosMateriales.cantidadMat;
      this.casaMedicaEdit = this.datosMateriales.casaMedica;
      this.fechaSoliciudEdit = this.datosMateriales.fechaSolicitud;
      this.fechaComproEdid = this.datosMateriales.fechaEstimada;
      this.fechaLlegaEdid = this.datosMateriales.fechaRecibido;
      this.unidadDeMedida = this.datosMateriales.unidad;
      
    })
  } 

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada;
  }

  cerrarVentana(){
    this.dialog.closeAll();
  }

  editar(){
    this.datosMateriales.estado = this.verSeleccion;
    let materialEnviar = this.convertirEstadoSalida(this.datosMateriales);
    this.datosMateriales.casaMedica = this.casaMedicaEdit;
    this.validarFechaSolicitud();
    this.validarFechaCompromiso();
    this.validarFechaLlegada();

    if(this.customertext.toString()!="" && this.customertext.toString() !=" "){
      this.datosMateriales.cantidadMat=this.customertext;
      
    }else{
      this.notificationService.success("No se editó el material");
    }
    this.materialEditar = new editarMateriales(this.datosMateriales.id, this.idProcedimiento, this.datosMateriales.codigoMaterial, materialEnviar.estado,this.fechaSoliciudEdit,this.fechaComproEdid,this.fechaLlegaEdid, this.casaMedicaEdit, this.datosMateriales.unidad);
    let res = this.serviceMateriales.editAgendaMaterial(this.materialEditar).subscribe();
    if(res != null){
      this.convertirEstadoLleda(this.datosMateriales);
      this.utilityService.changeMaterial(this.datosMateriales);
      this.cerrarVentana();
    }

  } 
  convertirEstadoLleda(materialCambiar) {
    for (let j = 0; j < this.estadosMat.length; j++) {
      if (materialCambiar.estado == this.estadosMat[j].valor) {
        materialCambiar.estado = this.estadosMat[j].contenido;
      }
    }
  }

  convertirEstadoSalida(materialCambiar): MaterialRequerido {
    for (let j = 0; j < this.estadosMat.length; j++) {
      if (materialCambiar.estado == this.estadosMat[j].contenido) {
        materialCambiar.estado = this.estadosMat[j].valor;
      }
    } 
    return materialCambiar;
  }
 
  hacerListaEstadosMat(){
    this.listaEstadosMat = [];
    for (let i = 0; i < this.estadosMat.length; i++) {
      if (this.estadosMat[i].contenido != this.datosMateriales.estado) {
        this.listaEstadosMat.push(this.estadosMat[i]);
      }
    }
    
  }

  validarFechaSolicitud(){
    if(this.fechaSoliciudEdit == undefined || this.fechaSoliciudEdit == ""){
      this.todaySoli = new Date().toISOString().split('T')[0];
      this.fechaSoliciudEdit = this.todaySoli;
      this.datosMateriales.fechaSolicitud = this.fechaSoliciudEdit;
    }else{
      this.datosMateriales.fechaSolicitud = this.fechaSoliciudEdit.toString();
    }
  }

  validarFechaCompromiso(){
    if(this.fechaComproEdid == undefined || this.fechaComproEdid == ""){
      this.todayCompro = new Date().toISOString().split('T')[0];
      this.fechaComproEdid = this.todayCompro;
      this.datosMateriales.fechaEstimada = this.fechaComproEdid;
    }else{
      this.datosMateriales.fechaEstimada = this.fechaComproEdid.toString();
    }
  }

  validarFechaLlegada(){
    if(this.fechaLlegaEdid == undefined || this.fechaLlegaEdid == ""){
      this.todayLlegada = new Date().toISOString().split('T')[0];
      this.fechaLlegaEdid = this.todayLlegada;
      this.datosMateriales.fechaRecibido = this.fechaLlegaEdid;
    }else{
      this.datosMateriales.fechaRecibido = this.fechaLlegaEdid.toString();
    }
  }
}



