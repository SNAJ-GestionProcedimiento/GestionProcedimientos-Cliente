import {AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { VentanaAuxiliarMaterialComponent } from '../ventana-auxiliar-material/ventana-auxiliar-material.component';
import { MaterialRequerido } from '../../../_models/material.model';
import { estadoMatClass, obtenerEstadoMat } from '../../../_models/materiales-estado.model';
import {MaterialesService} from '../../../_services/materiales.service'
import * as notificationService from 'src/_services/notification.service';
import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-auxiliar-materiales',
  templateUrl: './auxiliar-materiales.component.html',
  styleUrls: ['./auxiliar-materiales.component.css'],
})

export class AuxiliarMaterialesComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";
  public tituloTabla="Materiales"
  estados: estadoMatClass[];
  arrayMats: MaterialRequerido[]=[];
  dataMats = null;
  parrafo = "";
  estadosMat: estadoMatClass[];
  varMaterialesRequeridos: MaterialRequerido[];

  //Nombres de las columnas que se van a mostrar en la tabla materiales
  displayedColumnsMat: string[] = [ 'codigoMaterial', 'nombre', 'estado', 'casaMedica', 'fechaSolicitud', 'fechaEstimada', 'fechaRecibido', 'cantidadMat', 'unidad', 'acciones'];

  dataMaterialesRequeridos: MatTableDataSource<MaterialRequerido>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private materialesService: MaterialesService,
    private notificationService: NotificationService
     
    ) { }

    ngOnInit(): void {
      this.estadosMat = obtenerEstadoMat.getEstadoObtenido();
      
    }

    public validarMateriales(){
      for (let i = 0; i < this.arrayMats.length; i++) {
        if(this.arrayMats[i].estado == 'null'){
          for (let j = 0; j < this.arrayMats.length; j++) {
            this.arrayMats[i].estado = "Por Solicitar";
          } 
        }
      }  
    }



    public listarMaterialesPorCodigoModalidad(){
      this.materialesService.getMaterialesProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: MaterialRequerido[]) => {
        this.arrayMats=result;
        this.parrafo="";
        this.validarMateriales();

        if (this.arrayMats != null) {
          this.dataMaterialesRequeridos = new MatTableDataSource(this.arrayMats);
          this.dataMaterialesRequeridos.paginator = this.paginator;
        } else {
          this.parrafo = "No hay materiales requeridos para el procedimiento seleccionado";
          this.notificationService.success(this.parrafo);
        }
        
      })
    }



    ngAfterViewInit() {
    }
    openAgregarMaterial() {
      const dialogoConfig = new MatDialogConfig();
      //dialogoConfig.disableClose=true;
      dialogoConfig.autoFocus=true;
      dialogoConfig.width="60%";
      this.dialog.open(VentanaAuxiliarMaterialComponent, dialogoConfig);
    }
 


  

}

  




/*const ELEMENT_DATA_MAT: Materiales[]=[
  {posicion: 1, codigo: 234234, nombre: 'Pinzas', estado: 'Solicitado', casa: 'Ni idea', fechaSol: '13 Septiembre', fechaCom: '15 Septiembre', fechaLlegada: '15 Septiembre', cantidad: 14, unidad: 'm', acciones: 'editar'},
  {posicion: 2, codigo: 323423, nombre: 'otros', estado: 'Solicitado', casa: 'aja', fechaSol: '13 Septiembre', fechaCom: '15 Septiembre', fechaLlegada: '15 Septiembre', cantidad: 14, unidad: 'm', acciones: 'editar'}
]*/
