import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialogConfig } from "@angular/material/dialog";
import { MatTable } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaterialRequerido, editarMateriales } from '../../../_models/material.model';
import { editarDocumentos } from '../../../_models/documento.model';
import { MaterialesService } from '../../../_services/materiales.service';
import * as notificationService from 'src/_services/notification.service';
import { UtilityServiceService } from '../../../_services/utility-service.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ventana-auxiliar-material',
  templateUrl: './ventana-auxiliar-material.component.html',
  styleUrls: ['./ventana-auxiliar-material.component.css']
})
export class VentanaAuxiliarMaterialComponent implements OnInit {

  data: Array<any>;
  arrayMateriales: MaterialRequerido[];
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  datosSeleccionados: MaterialRequerido[] = [];
  editMaterial: editarMateriales;
  datosAddMat: MaterialRequerido[] = [];
  idProcedimiento: number;
  displayedColumns: string[] = ['codigo', 'nombre', 'estado', 'casa', 'unidad', 'acciones'];

  dataSourceMat = new MatTableDataSource<MaterialRequerido>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private serviceMateriales: MaterialesService,
    private notificationService: notificationService.NotificationService,
    private dialog: MatDialog,
    private utilityService: UtilityServiceService
  ) { }

  ngOnInit(): void {
    this.getAllMateriales();
    this.utilityService.customMaterialAdd.subscribe(msg => this.datosAddMat = msg);
    this.utilityService.customIdAgendaProcedimiento.subscribe(msg => this.idProcedimiento = msg);
      
 

  }

  getAllMateriales(){
    this.serviceMateriales.getAllMateriales().subscribe((result: MaterialRequerido[]) =>{
      this.arrayMateriales = MaterialRequerido.fromJSON(result);

      if (this.arrayMateriales != null){
        this.arrayMateriales.sort(function (a,b){
          return ((a.nombre < b.nombre) ? -1 : ((a.nombre > b.nombre) ? 1: 0));
        })
      }else{
        this.notificationService.success('No existen materiales');
      }

    })
  }

  capturar(){
    this.verSeleccion = this.opcionSeleccionada;
    this.agregarDatoTabla();
  }

  agregarDatoTabla(){
    for( let i = 0; i < this.arrayMateriales.length; i++){
      if(this.arrayMateriales[i].nombre == this.verSeleccion){
        if(!this.datosSeleccionados.includes(this.arrayMateriales[i])){
          this.datosSeleccionados.push(this.arrayMateriales[i]);
          this.dataSourceMat = new MatTableDataSource(this.datosSeleccionados);
          this.dataSourceMat.paginator = this.paginator;
          break;
        }
      }
    }
  }

  confirmacionLimpiar() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea eliminar TODOS los intrumentos y/o equipos que ha agregado en la tabla?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.limpiarLista();
        }
      });
  }

  limpiarLista() {
    this.datosSeleccionados = [];
    this.dataSourceMat = new MatTableDataSource(this.datosSeleccionados);
    this.dataSourceMat.paginator = this.paginator;
  }

  cerrarVentana() {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea SALIR de la ventana añadir intrumentos y/o equipos puesto que si sale y tiene instrumentos en la vista previa estos no se añadirán y se borrará de la tabla?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.dialog.closeAll();
        }
      });
  }

  eliminarDato(materialAeliminar: MaterialRequerido) {
    for (let i = 0; i < this.datosSeleccionados.length; i++) {
      if (this.datosSeleccionados[i] == materialAeliminar) {
        this.datosSeleccionados.splice(i, 1);
        this.dataSourceMat = new MatTableDataSource(this.datosSeleccionados);
        this.dataSourceMat.paginator = this.paginator;
        break;
      }
    }
  }

  addMaterial(){
    this.dialog
    .open(ConfirmationDialogComponent, {
      data: `¿Seguro que desea añadir todos los intrumentos y/o equipos que ha agregado en la tabla?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if(confirmado){
        for(let i=0; i<this.datosSeleccionados.length; i++){
          const resultado = this.datosAddMat.find( material => 
            material.codigoMaterial === this.datosSeleccionados[i].codigoMaterial);

            if(!resultado){
              this.editMaterial = new editarMateriales(this.datosSeleccionados[i].id, this.idProcedimiento,this.datosSeleccionados[i].codigoMaterial, "PSOL", null,null,null,this.datosSeleccionados[i].casaMedica);

              let res = this.serviceMateriales.addInstrumento(this.editMaterial).subscribe();
            }else{
              this.editMaterial = new editarMateriales(resultado.id, this.idProcedimiento, resultado.codigoMaterial, "PSOL", null,null,null,resultado.casaMedica);
              let res = this.serviceMateriales.editAgendaMaterial(this.editMaterial).subscribe();
            }

            this.utilityService.changeMaterialAdd(this.datosAddMat);
        }

        this.utilityService.changeMaterialAdd(this.datosAddMat);
        this.dialog.closeAll();
      }
    });
  }






}

