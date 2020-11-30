import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { UsuarioObtenerService } from 'src/_services/usuarios/usuario-obtener.service';

import { Usuario } from 'src/_models/modelsLogin/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosCrearComponent } from './usuarios-crear/usuarios-crear.component';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {

  public busquedaForm:FormGroup;
  /**Variables de busqueda*/
  public filtroSeleccionado:boolean = true;
  public campoIngresado:boolean = true;
  public filtroBusqueda:string = '';
  public datoBusqueda:string = '';
  /**Datos de la tabla */
  public usuarios:Array<Usuario>;
  
  /**Array de titulos de columnas */
  public displayedColumns: string[] = [
    'idUsuario',
    'nombres',
    'apellidos',
    'email',
    'nombreUsuario',
    'tipoUsuario',
    'acciones',
    ];
    public dataSource;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private formBuilder:FormBuilder,
    private usuarioObtenerService:UsuarioObtenerService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';  //para que material este en español
    this.buildbusquedaForm();
    this.getUsuarios();
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
  agregarOnclick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.matDialog.open(UsuariosCrearComponent,dialogConfig);
  }

  /**Peticiones */
  public async getUsuarios(){
    let res:any = await this.usuarioObtenerService.getUsers().toPromise();
    if(res!=null){
      this.usuarios = new Array<Usuario>();
      res.forEach(element => {
        let usuario = new Usuario(element.id,element.username,"",element.first_name,element.last_name,element.email,element.groups);
        this.usuarios.push(usuario);
      });
      console.log(this.usuarios);
      this.dataSource = new MatTableDataSource<any>(this.usuarios);
      this.dataSource.paginator = this.paginator;
    }
  }
}
