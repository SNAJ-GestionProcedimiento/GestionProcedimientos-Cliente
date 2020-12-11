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
import { UtilityServiceService } from '../../../_services/utility-service.service';
import { DocumentoRequerido, editarDocumentos } from '../../../_models/documento.model';
import { element } from 'protractor';
import { VentanaEditarMaterialesComponent } from '../auxiliar-materiales/ventana-editar-materiales/ventana-editar-materiales.component'
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-auxiliar-materiales',
  templateUrl: './auxiliar-materiales.component.html',
  styleUrls: ['./auxiliar-materiales.component.css'],
})

export class AuxiliarMaterialesComponent implements OnInit {

  @Input() codigoProcedimientoObtenido: string="";
  public tituloTabla="Materiales";
  parrafo = "";
  idProcedimiento: string;
  idAgendaProcedimiento: number;
  
  editMateriales: editarDocumentos;
  estadosMat: estadoMatClass[];
  estados: estadoMatClass[];
  arrayMateriales: MaterialRequerido[];
  materialEditable: MaterialRequerido;
  datosAddMaterial: MaterialRequerido[]=[];
  materialesRequeridos: MaterialRequerido[]=[];
  idModalidad: string='';
  idProcedimientoModalidad: string;
  objBanderaRequerido: Boolean;
  banderaBotonAnadir: Boolean;


  displayedColumnsMat: string[] = [ 'codigoMaterial', 'nombre', 'estado', 'fechaSolicitud', 'fechaCompromiso', 'fechaLlegada',/*'casaMedica,  */ 'casaMedica','cantidadMat', 'unidad', 'acciones'];

  dataMaterialesRequeridos: MatTableDataSource<MaterialRequerido>;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private materialesService: MaterialesService,
    private notificationService: NotificationService,
    private utilityService: UtilityServiceService
     
    ) { }

    ngOnInit(): void {

      this.utilityService.customMaterial.subscribe(msg => {
        this.materialEditable = msg;
      })

      this.utilityService.customBanderaRequerido.subscribe(msg => {
        this.objBanderaRequerido = msg;
        if(this.objBanderaRequerido == true){
          if(this.idProcedimiento != ""){
            if(this.idModalidad != ""){
              this.listarMaterialesRequeridos();
            }
          }
        }
      })

      this.utilityService.customBanderaBotonAnadir.subscribe(msg => this.banderaBotonAnadir=msg);

      this.utilityService.customIdProcedimiento.subscribe(msg => this.idProcedimiento = msg);



      this.utilityService.customIdModalidad.subscribe(element => {
        this.idModalidad = element;
      });

      this.utilityService.customIdProcedimientoModalidad.subscribe(element => this.idProcedimientoModalidad = element);

      this.utilityService.customIdProcedimiento.subscribe(element => 
        this.idProcedimiento = element
      );

      this.utilityService.customEstadosMat.subscribe(element => 
        this.estadosMat
      );
     
      this.estadosMat = obtenerEstadoMat.getEstadoObtenidoMateriales();
      this.utilityService.changeEstado(this.estadosMat);
      
    
      this.utilityService.customEstadosMat.subscribe(element => 
        this.estados
      );

      
      this.utilityService.customMaterialAdd.subscribe(element => {
        this.datosAddMaterial = element;
        if(this.idProcedimiento != ""){
          this.listarMateriales();
        }
      });

      this.utilityService.customIdAgendaProcedimiento.subscribe(msg =>{
        this.idAgendaProcedimiento = msg;
        if (this.idProcedimiento != "") {
          this.listarMateriales();
        }
      });
     
      
    }

    listarMateriales(){
      this.parrafo="";
      this.materialesService.getMaterialRequerido(this.idAgendaProcedimiento).subscribe((rest: MaterialRequerido[]) =>
      {
        this.arrayMateriales = MaterialRequerido.fromJSON(rest);
        if(this.arrayMateriales != null){
          this.parrafo = "";
          this.convertirEstadoLleda(this.arrayMateriales);
          this.listarMaterialesRequeridos();
        }else{ 
          this.arrayMateriales=[];
          this.parrafo = "No hay materiales asociados al procedimiento";        
          this.notificationService.warn('No hay materiales asociados al procedimiento');
        }
        this.dataMaterialesRequeridos = new MatTableDataSource(this.arrayMateriales);
        this.dataMaterialesRequeridos.paginator = this.paginator;
      })
    } 

    listarMaterialesRequeridos(){
      if(parseInt(this.idModalidad) != null){
        this.materialesRequeridos = [];
        this.materialesService.getMaterialesProcedimiento(parseInt(this.idProcedimiento),parseInt(this.idModalidad)).subscribe(
          (result: MaterialRequerido[]) => {
            
            this.materialesRequeridos = result;

            if(this.objBanderaRequerido == true){
              for(let i = 0; i < this.materialesRequeridos.length; i++){
                this.materialesRequeridos[i].estado = "";
              }
              this.dataMaterialesRequeridos = new MatTableDataSource(this.materialesRequeridos);
              this.dataMaterialesRequeridos.paginator = this.paginator
            }
        } );
      }else{
        this.notificationService.warn('No existe modalidad');
      }
    }

    editarMaterial(materialEditar: MaterialRequerido): void {
      this.materialEditable = materialEditar;
      this.utilityService.changeMaterial(this.materialEditable);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      this.dialog.open(VentanaEditarMaterialesComponent, dialogConfig);
    }

    validarMaterialRequerido(materialReq: MaterialRequerido): Boolean {
      let res = false;
      for (let i = 0; i < this.materialesRequeridos.length; i++) {
        if (this.materialesRequeridos[i].nombre == materialReq.nombre) {
          res = true;
          break;
        }
      }
     
      return res;
    }

    public validarEstados(){
      for(let i=0; i<this.materialesRequeridos.length; i++){
        if(this.materialesRequeridos[i].estado == 'null'){
          for(let j = 0; this.estadosMat.length; j++){
            this.materialesRequeridos[i].estado = "Por solicitar"

          }
        }
      }
    }

    public listarMaterialesPorCodigoModalidad(){
      this.materialesService.getMaterialesProcedimiento(Number(this.codigoProcedimientoObtenido),1).subscribe((result: MaterialRequerido[]) => {
        this.arrayMateriales=result;
        this.parrafo="";
        this.validarEstados();

        if (this.arrayMateriales != null) {
          this.parrafo = "Materiales requeridos cargados exitosamente";
          this.dataMaterialesRequeridos = new MatTableDataSource(this.arrayMateriales);
          this.dataMaterialesRequeridos.paginator = this.paginator;
        } else {
          this.parrafo = "No hay materiales requeridos para el procedimiento seleccionado";
          this.notificationService.success(this.parrafo);
        }
        
      });
    } 
  
    
    eliminarDatoMat(materialElim: MaterialRequerido) {
      this.dialog.open(ConfirmationDialogComponent, {
          data: `¿Seguro que desea eliminar el instrumento o equipo?`
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            for (let i = 0; i < this.arrayMateriales.length; i++) {
              if (this.arrayMateriales[i].nombre == materialElim.nombre) {
                this.materialesService.deleteMaterial(this.arrayMateriales[i].id).subscribe();
                this.listarMateriales();
                this.listarMaterialesRequeridos();
                break;
              }
            }
          }       
          this.listarMateriales();
          this.listarMaterialesRequeridos();
        });
    }

    convertirEstadoLleda(materialAcambiar) {
      for (let i = 0; i < materialAcambiar.length; i++) {
        for (let j = 0; j < this.estadosMat.length; j++) {
          if (materialAcambiar[i].estado == this.estadosMat[j].valor) {
            materialAcambiar[i].estado = this.estadosMat[j].contenido;
          }
        }
      }
    }
  
    convertirEstadoSalida(materialAcambiar): MaterialRequerido {
      for (let j = 0; j < this.estadosMat.length; j++) {
        if (materialAcambiar.estado == this.estadosMat[j].contenido) {
          materialAcambiar.estado = this.estadosMat[j].valor;
        }
      }
      return materialAcambiar;
    }

    openAgregarMaterial(){
      const dialogoConfig = new MatDialogConfig();
      dialogoConfig.autoFocus = true;
      dialogoConfig.width = "60%";
      this.datosAddMaterial = this.arrayMateriales;
      this.utilityService.changeMaterialAdd(this.datosAddMaterial);
      this.dialog.open(VentanaAuxiliarMaterialComponent, dialogoConfig);
    }

    ngAfterViewInit() {
    } 
  
 
  
  

}
