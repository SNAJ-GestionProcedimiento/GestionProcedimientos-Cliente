import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VentanaAuxiliarInstrumentosEquiposComponent } from '../ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { InstrumentosEquiposService } from 'src/_services/serviciosInstrumentos/instrumentos-equipos.service';
import { editInstrumentosEquipos, InstrumentosEquipos, intrumentoEstadoUnidos } from 'src/_models/modelInstrumento/instrumentos-equipos.model';
import { ProcedimientoComponent } from '../procedimiento/procedimiento.component';
import { estadoClass, InstrumentosEquiposEstado } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import * as notificationService from 'src/_services/notification.service';
 


@Component({
  selector: 'app-auxiliar-instrumentos-equipos',
  templateUrl: './auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./auxiliar-instrumentos-equipos.component.css']
})
export class AuxiliarInstrumentosEquiposComponent implements OnInit {

  varVariables = {
    cantidad: null,
    estado: null
  }

  public idProcedimientoInstrumento: string;  //variable para obtener el id del procedimiento
  instrumEstadoUnido: intrumentoEstadoUnidos[] = [];  //variable utilizada para unir getIstrumento y getEstado..... no sirvio jaja

  editInstrument: editInstrumentosEquipos;  //variable utilizada para editar los instrumentos
  estados: estadoClass[] = [];  //variable que tiene el array de estados
  estado: estadoClass; //variable de tipo estado

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'descripcion', 'estado', 'acciones'];  //las columnas de la tabla asociadas a las propiedades
  dataIntrumentEquip: MatTableDataSource<InstrumentosEquipos>; //variable que contiene los datos que irán en la tabla

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; //utilizado para paginar la tabla
  @ViewChild(ProcedimientoComponent) procedimientoRef: ProcedimientoComponent; //se llama al procedimiento como padre para obtener el código del procedimiento

  constructor(private dialog: MatDialog, private serviceIntrumentosEquipos: InstrumentosEquiposService, private notificationService: notificationService.NotificationService) { }

  //la inicialización del componente
  ngOnInit(): void {
    this.setIdProcedimiento();
    console.log(this.idProcedimientoInstrumento);
    this.getEstadoObtenido();
  }
  public setIdProcedimiento(){
    this.idProcedimientoInstrumento = this.procedimientoRef.getCodigoProcedimiento()
  }

  result2: InstrumentosEquipos; //variable para probar el método fromJson de la clase instrumentoEquipo

  //método para en listar los equipos asociados a un procedimiento
  public listarIntrumentEquip() {
    //this.idProcedimientoInstrumento=this.idProcedimiento.getCodigoProcedimiento();
    //console.log(this.idProcedimientoInstrumento);

    //se llama el servicio del get para que traiga los instrumentos de la base de datos y los guarda en resul como Json
    this.serviceIntrumentosEquipos.getInstrumentoEquipo(5).subscribe((result: InstrumentosEquipos[]) => {
      this.dataIntrumentEquip = new MatTableDataSource(result); //se le envia los datos a la tabla.
      //console.log(result);
      //this.result2 = InstrumentosEquipos.fromJSON(result);
      //agrega los instrumentos del get con los estados de la otra consulta
      this.instrumEstadoUnido.push(new intrumentoEstadoUnidos(result, this.estados));
      //console.log("union: ---------------- " + this.instrumEstadoUnido[0].intrumento[0].nombre);
      //console.log(this.result2);
    });
  }

  //Método para obtener los estados.
  getEstadoObtenido() {
    this.serviceIntrumentosEquipos.getEstados().subscribe((resut: InstrumentosEquiposEstado[]) => {
      var estadoP = JSON.stringify(resut);
      var estadoS = estadoP.split("[");
      for (let i = 0; i < estadoS.length; i++) {
        const element = estadoS[i];
        if (i > 1) {
          var partido = element.split("]");

          for (let j = 0; j < partido.length; j++) {
            if (j == 0) {
              var elementos = partido[0].split(",");
              elementos[0].replace(/\"/g, "");
              elementos[1].replace(/\"/g, "");
              this.estado = {
                valor: elementos[0],
                contenido: elementos[1]
              };
              this.estados.push(this.estado);
              //console.log(this.estados);
            }
          }
        }
      }
    });
  }

  //metodo para editar un instrumento
  editarIntrumentoEquipo(Instrument: InstrumentosEquipos): void {
    console.log(Instrument);

    this.editInstrument = new editInstrumentosEquipos(Instrument.id, 5, Instrument.codigoEquipo.toString(), Instrument.estado, Instrument.cantidad);
    let res = this.serviceIntrumentosEquipos.editarInstrumentoEquipo(this.editInstrument).subscribe();
    if (res != null) {
      this.notificationService.success('Se edito el instrumento con código: ' + Instrument.codigoEquipo.toString());
      console.log("cambio");
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
}


