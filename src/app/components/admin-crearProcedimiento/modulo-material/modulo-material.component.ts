import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { editarMateriales, MaterialRequerido } from 'src/_models/material.model';
import { MaterialesService } from 'src/_services/materiales.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import * as notificationService from 'src/_services/notification.service';

@Component({
  selector: 'app-modulo-material',
  templateUrl: './modulo-material.component.html',
  styleUrls: ['./modulo-material.component.css']
})
export class ModuloMaterialComponent implements OnInit {

  data: Array<any>;
  arrayMateriales: MaterialRequerido[];
  opcionSeleccionada: string = '0';
  verSeleccion = '';
  datosSeleccionados: MaterialRequerido[] = [];
  editMaterial: editarMateriales;
  datosAddMat: MaterialRequerido[] = [];
  idProcedimiento: number;
  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'unidad', 'acciones'];

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
    $("#mi_select2").val("0");
  }

  agregarDatoTabla(){
    for( let i = 0; i < this.arrayMateriales.length; i++){
      if(this.arrayMateriales[i].nombre == this.verSeleccion){
        if(!this.datosSeleccionados.includes(this.arrayMateriales[i])){
          this.arrayMateriales[i].cantidadMat=1;
          this.arrayMateriales[i].cantidad=1;
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
        data: `¿Seguro que desea eliminar TODOS los materiales que ha agregado en la tabla?`
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

  eliminarDato(materialAeliminar: MaterialRequerido) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea ELIMINAR el material de la lista?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          for (let i = 0; i < this.datosSeleccionados.length; i++) {
            if (this.datosSeleccionados[i] == materialAeliminar) {
              this.datosSeleccionados.splice(i, 1);
              this.dataSourceMat = new MatTableDataSource(this.datosSeleccionados);
              this.dataSourceMat.paginator = this.paginator;
              break;
            }
          }
        }
      });
    
  }

  /*addMaterial(){
    this.dialog
    .open(ConfirmationDialogComponent, {
      data: `¿Seguro que desea añadir todos los materiales que ha agregado en la tabla?`
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
  }*/

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getMaterialesRequeridos():MaterialRequerido[]{
    return this.datosSeleccionados;
  }
}