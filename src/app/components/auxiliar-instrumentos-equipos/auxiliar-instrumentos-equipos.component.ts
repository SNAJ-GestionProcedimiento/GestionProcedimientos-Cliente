import { Component, Input, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VentanaAuxiliarInstrumentosEquiposComponent } from '../ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { InstrumentosEquiposService } from 'src/_services/serviciosInstrumentos/instrumentos-equipos.service';
import { editInstrumentosEquipos, InstrumentosEquipos, intrumentoEstadoUnidos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';
import { estadoClass, obtenerEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import * as notificationService from 'src/_services/notification.service';
 


@Component({
  selector: 'app-auxiliar-instrumentos-equipos',
  templateUrl: './auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./auxiliar-instrumentos-equipos.component.css']
})
export class AuxiliarInstrumentosEquiposComponent implements OnInit {

  
  @Input() codigoProcedimientoObtenido: string="";//Codigo del procedimiento seleccionado
  instrumEstadoUnido: intrumentoEstadoUnidos[] = [];  //variable utilizada para unir getIstrumento y getEstado..... no sirvio jaja

  parrafo="";//para colocar que no hay nada en las tablas

  editInstrument: editInstrumentosEquipos;  //variable utilizada para editar los instrumentos
  estados: estadoClass[];  //variable que tiene el array de estados
  //estado: estadoClass; //variable de tipo estado
  arrayInstrumentos: InstrumentosEquipos[]=[];

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'descripcion', 'estado', 'acciones'];  //las columnas de la tabla asociadas a las propiedades
  dataIntrumentEquip: MatTableDataSource<InstrumentosEquipos>; //variable que contiene los datos que irán en la tabla

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; //utilizado para paginar la tabla


  constructor(
    private dialog: MatDialog, 
    private serviceIntrumentosEquipos: InstrumentosEquiposService, 
    private notificationService: notificationService.NotificationService) { }

  //la inicialización del componente
  ngOnInit(): void {
    this.estados=obtenerEstado.getEstadoObtenido(); 
    console.log("El codigo desde documentacion es: "+this.codigoProcedimientoObtenido);
  }
  

  result2: InstrumentosEquipos; //variable para probar el método fromJson de la clase instrumentoEquipo

  //método para en listar los equipos asociados a un procedimiento
  public listarIntrumentEquip() {
    console.log("el codigo desde instrumento es: "+this.codigoProcedimientoObtenido);
    //se llama el servicio del get para que traiga los instrumentos de la base de datos y los guarda en resul como Json
    this.serviceIntrumentosEquipos.getInstrumentoEquipo(parseInt(this.codigoProcedimientoObtenido)).subscribe((result: InstrumentosEquipos[]) => {

      this.arrayInstrumentos=InstrumentosEquipos.fromJSON(result);
      if (this.arrayInstrumentos!=null) {
      this.convertirEstadoLleda(this.arrayInstrumentos);
      console.log("Es el array! estado: "+this.arrayInstrumentos[0].estado);
      this.dataIntrumentEquip = new MatTableDataSource(this.arrayInstrumentos); //se le envia los datos a la tabla. 
      }else{
        this.parrafo="No hay instrumentos y/o equipos asociado al procedimiento";
        this.notificationService.success('No hay instrumentos y/o equipos asociados al procedimiento!');
      }
    });
  }

  //metodo para editar un instrumento
  editarIntrumentoEquipo(Instrument: InstrumentosEquipos): void {
    let instrumetEnviar=this.convertirEstadoSalida(Instrument);
    this.editInstrument = new editInstrumentosEquipos(Instrument.id, 5, Instrument.codigoEquipo.toString(), instrumetEnviar.estado, Instrument.cantidad);
    let res = this.serviceIntrumentosEquipos.editarInstrumentoEquipo(this.editInstrument).subscribe();
    if (res != null) {
      this.notificationService.success('Se edito el instrumento con código: ' + Instrument.codigoEquipo.toString());
      console.log("cambio");
      this.listarIntrumentEquip();
    } else {
      console.log("no cambio");
    }
  }

  //método para abrir una ventana emergente
  openAgregarIntru() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.dialog.open(VentanaAuxiliarInstrumentosEquiposComponent, dialogoConfig);
  }

  convertirEstadoLleda(instrumentoAcambiar){
    for (let i = 0; i < instrumentoAcambiar.length; i++) {
      for (let j = 0; j < this.estados.length; j++) {
        if(instrumentoAcambiar[i].estado==this.estados[j].valor){
          instrumentoAcambiar[i].estado=this.estados[j].contenido;
        }
      }
    }
  }

  convertirEstadoSalida(instrumentoAcambiar): InstrumentosEquipos{
    console.log("entro al método: "+instrumentoAcambiar.length);
      for (let j = 0; j < this.estados.length; j++) {
        console.log("instrment que llego: "+instrumentoAcambiar.estado+" estado: "+this.estados[j].contenido);
        if(instrumentoAcambiar.estado==this.estados[j].contenido){
          console.log("entro en salida");
          instrumentoAcambiar.estado=this.estados[j].valor;
        }
    }
    return instrumentoAcambiar;
  }
}


