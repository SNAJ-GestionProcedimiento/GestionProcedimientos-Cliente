import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { UsuarioObtenerService } from 'src/_services/usuarios/usuario-obtener.service';

import { Usuario } from 'src/_models/modelsLogin/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { obtenerEstado } from 'src/_models/estado-Procedimiento.model';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-procedimientos',
  templateUrl: './admin-procedimientos.component.html',
  styleUrls: ['./admin-procedimientos.component.css']
})
export class AdminProcedimientosComponent implements OnInit {
  public busquedaForm:FormGroup;
  /**Variables de busqueda*/
  public filtroSeleccionado:boolean = true;
  public campoIngresado:boolean = true;
  public filtroBusqueda:string = '';
  public datoBusqueda:string = '';
  /**Datos de la tabla */
  public usuarios:Array<Usuario>;
  public procedimientos: Procedimiento[];
  estados: estadoClass[];  //variable que tiene el array de estados  
  
  /**Array de titulos de columnas */
  public displayedColumns: string[] = [
    'Codigo',
    'Nombre',
    'TipoProcedimiento',
    'acciones',
    ];
    public dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private formBuilder:FormBuilder,
    private usuarioObtenerService:UsuarioObtenerService,
    private router:Router,
    private procedimientoServece: ProcedimientoService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';  //para que material este en español
    this.buildbusquedaForm();
    this.estados = obtenerEstado.getEstadoObtenidoProcedimiento();
    this.getProced();
  }

  /**Formulario de busqueda */
  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      value:['',[]],
    });
    this.busquedaForm.get('searchType').valueChanges
    .subscribe(value =>{
      this.filtroBusqueda = value;
      this.filtroSeleccionado = true;
    })
    this.busquedaForm.get('value').valueChanges
    .subscribe(value =>{
      this.datoBusqueda = value;
      this.campoIngresado = true;
    })
  }

  /**Eventos de botones */
  buscarOnclick(){

  }

  /**Peticiones */
  public async getProced(){
    this.procedimientoServece.getProcedimientos().subscribe((res: Procedimiento[])=>{
      this.procedimientos=res;
      this.convertirEstadoLleda(this.procedimientos);
      this.dataSource = new MatTableDataSource<any>(this.procedimientos);
      this.dataSource.paginator = this.paginator;
    })
  }

  agregarProcedimientoOnclick(){
    this.router.navigateByUrl('admin/procedimiento/crear');
  }

  convertirEstadoLleda(instrumentoAcambiar: Procedimiento[]) {
    for (let i = 0; i < instrumentoAcambiar.length; i++) {
      for (let j = 0; j < this.estados.length; j++) {
        if (instrumentoAcambiar[i].tipo == this.estados[j].valor) {
          instrumentoAcambiar[i].tipo = this.estados[j].contenido;
        }
      }
    }
  }

  convertirEstadoSalida(instrumentoAcambiar): Procedimiento {
    for (let j = 0; j < this.estados.length; j++) {
      if (instrumentoAcambiar.TipoProcedimiento == this.estados[j].contenido) {
        instrumentoAcambiar.TipoProcedimiento = this.estados[j].valor;
      }
    }
    return instrumentoAcambiar;
  }

  eliminarDato(element: Procedimiento){
    let codigo= element.codigoProcedimiento;
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `¿Seguro que desea ELIMINAR el procedimiento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log(codigo);
          this.procedimientoServece.eliminarProcedimiento(codigo).subscribe(res=>{
            this.getProced();  
          });
        }
      });
  }
}
