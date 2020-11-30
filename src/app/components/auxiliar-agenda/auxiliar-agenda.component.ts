import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AgendaInfoComponent } from 'src/app/components/auxiliar-agenda/agenda-info/agenda-info.component';

import { ProcedimientoAgenda } from 'src/_models/models_Agenda/procedimiento-agenda.model';

import { AgendaListarService } from 'src/_services/serviciosAgenda/agenda-listar.service';
import { ProcedimientoService } from 'src/_services/procedimiento.service';

import { DateHelper } from 'src/_helpers/date.helper';
import { AgendaObtenerService } from 'src/_services/serviciosAgenda/agenda-obtener.service';
import { AgendaInfoService } from 'src/_services/serviciosComponentes/agenda-info.service';
import { AuxiliarEditarProgramacionComponent } from '../auxiliar-editar-programacion/auxiliar-editar-programacion.component';
import { AgendaObtenerFechaService } from 'src/_services/serviciosAgenda/agenda-obtener-fecha.service';
import { AgendaObtenerIdpacService } from 'src/_services/serviciosAgenda/agenda-obtener-idpac.service';
import { AuthHelper } from 'src/_helpers/auth.helper';
import { Procedimiento } from 'src/_models/procedimiento.model';



@Component({
  selector: 'app-auxiliar-agenda',
  templateUrl: './auxiliar-agenda.component.html',
  styleUrls: ['./auxiliar-agenda.component.css']
})

export class AuxiliarAgendaComponent implements OnInit {
 
  /**Variables de busqueda*/
  public filtroSeleccionado:boolean = true;
  public campoIngresado:boolean = true;
  public filtroBusqueda:string = '';
  public datoBusqueda:string = '';
  public filtroFecha:boolean = false;
  public datofecha1:string = '';
  public datofecha2:string = '';

  public agenda:Array<ProcedimientoAgenda>;
  public busquedaForm:FormGroup;
  public agendaCodigo:string;
  

  /**Array de titulos de columnas */
  public displayedColumns: string[] = [
    'codigoAgenda',
    'fechaProc',
    'horaProc',
    'codigoProc',
    'nombreProc',
    'tipoProc',
    'nombrePac',
    'tipoIdPac',
    'idPac',
    'edadPac',
    'acciones',
    ];
  public dataSource;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private matDialog: MatDialog,
    private agendaProcedimientoService:AgendaListarService,
    private agendaObtenerService:AgendaObtenerService,
    private agendaObtenerFechaService:AgendaObtenerFechaService,
    private agendaObtenerIdpacService:AgendaObtenerIdpacService,
    private formBuilder:FormBuilder,
    private router:Router,
    private procedimientoService:ProcedimientoService
    ) { 
      this.buildbusquedaForm();
    }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';  //para que material este en español
    let token = AuthHelper.getLoggedToken();
    this.getAgendas();
  }
  /**Formulario de busqueda */
  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      value:['',[]],
      sinceDate:['',[]],
      toDate:['',[]],
    });
    this.busquedaForm.get('searchType').valueChanges
    .subscribe(value =>{
      this.filtroBusqueda = value;
      this.filtroSeleccionado = true;
      if(value=='1'){
        this.filtroFecha = true;
      }else{
        this.filtroFecha = false;
      }
    })
    this.busquedaForm.get('value').valueChanges
    .subscribe(value =>{
      this.datoBusqueda = value;
      this.campoIngresado = true;
    })
    this.busquedaForm.get('sinceDate').valueChanges
    .subscribe(value =>{
      this.datoBusqueda = 'fecha';
      this.datofecha1 = value;
      this.campoIngresado = true;
    })
    this.busquedaForm.get('toDate').valueChanges
    .subscribe(value =>{
      this.datoBusqueda = 'fecha';
      this.datofecha2 = value;
      this.campoIngresado = true;
    })
  }
  /**Metodos de busqueda  */
  private fechasincompletas():boolean{
    if(this.datofecha1=='' || this.datofecha2==''){
      return true;
    }
  }
  public buscarOnclick(){
    if(this.datoBusqueda!=''){
      if(this.filtroBusqueda != ''){
        switch(this.filtroBusqueda){
          case '1':
            if(this.fechasincompletas()){
              this.campoIngresado = false;
            }else{
              console.log('buscando fechas: '+this.datofecha1 + '-' + this.datofecha2);
              this.getAgendasFecha(this.datofecha1,this.datofecha2);
            }
            break;
          case '2':
            console.log('buscando codigos');
            this.getAgendasId(this.datoBusqueda);
            break;
          case '3':
            console.log('buscando pacientes');
            this.getAgendasIdPaciente(this.datoBusqueda);
            break;
        }
      }else{
        this.filtroSeleccionado = false;
      }
    }else{
      this.campoIngresado = false;
    }
  }

  /**Eventos */
  public verAgenda(idAgenda:string, idPaciente:string){
    AgendaInfoComponent.idPaciente = idPaciente;
    AgendaInfoComponent.idAgendaProcedimiento = idAgenda;

    const dialogoConfig = new MatDialogConfig();
    dialogoConfig.autoFocus = true;
    dialogoConfig.width = "60%";
    this.matDialog.open(AgendaInfoComponent,dialogoConfig);
  }

  /**Peticiones */
  public async getAgendas(){
    let res:any = await this.agendaProcedimientoService.list().toPromise();
    if(res!=null){
      this.agenda = new Array<ProcedimientoAgenda>();
      res.forEach(element => {
        let procAgenda = ProcedimientoAgenda.fromJSON(element);
        this.agenda.push(procAgenda);
      });
      console.log(this.agenda);
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }

  /**Peticiones de busqueda */
  public async getAgendasId(codigoAgenda:string){
    let res:any = await this.agendaObtenerService.get(codigoAgenda).toPromise();
    if(res!=null){
      this.agenda = new Array<ProcedimientoAgenda>();
      let procAgenda = ProcedimientoAgenda.fromJSON(res);
      this.agenda.push(procAgenda);
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }
  public async getAgendasFecha(fechaInicio:string,fechaFin:string){
    let res:any = await this.agendaObtenerFechaService.get(fechaInicio,fechaFin).toPromise();
    if(res!=null){
      this.agenda = new Array<ProcedimientoAgenda>();
      res.forEach(element => {
        let procAgenda = ProcedimientoAgenda.fromJSON(element);
        this.agenda.push(procAgenda);
      });
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }
  public async getAgendasIdPaciente(idPaciente:string){
    let res:any = await this.agendaObtenerIdpacService.get(idPaciente).toPromise();
    if(res!=null){
      this.agenda = new Array<ProcedimientoAgenda>();
      res.forEach(element => {
        let procAgenda = ProcedimientoAgenda.fromJSON(element);
        this.agenda.push(procAgenda);
      });
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }


  public editarAgenda(element){
    console.log('enviado:'+JSON.stringify(element));
    AuxiliarEditarProgramacionComponent.recibido = element;
    this.router.navigateByUrl('programacion/editar');
  }

  public agendarOnclick(){
    this.router.navigateByUrl('programacion/crear');
  }

}
