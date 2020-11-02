import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AgendaInfoComponent } from 'src/app/components/auxiliar-agenda/agenda-info/agenda-info.component';

import { ProcedimientoAgenda } from 'src/_models/models_Agenda/procedimiento-agenda.model';

import { AgendaListarService } from 'src/_services/serviciosAgenda/agenda-listar.service';

import { DateHelper } from 'src/_helpers/date.helper';
import { AgendaObtenerService } from 'src/_services/serviciosAgenda/agenda-obtener.service';
import { AgendaInfoService } from 'src/_services/serviciosComponentes/agenda-info.service';
import { AuxiliarEditarProgramacionComponent } from '../auxiliar-editar-programacion/auxiliar-editar-programacion.component';


@Component({
  selector: 'app-auxiliar-agenda',
  templateUrl: './auxiliar-agenda.component.html',
  styleUrls: ['./auxiliar-agenda.component.css']
})
export class AuxiliarAgendaComponent implements OnInit {
  keyword = 'name';
  data:Array<any>;

  public agenda:Array<ProcedimientoAgenda>;
  public busquedaForm:FormGroup;

  /**Array de titulos de columnas */
  public displayedColumns: string[] = [
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private matDialog: MatDialog,
    private agendaProcedimientoService:AgendaListarService,
    private formBuilder:FormBuilder,
    private router:Router
    ) { 
      this.buildbusquedaForm();
    }

  ngOnInit(): void {
    this.getAgendas();
  }
  /**Formulario de busqueda */
  private buildbusquedaForm(){
    this.busquedaForm = this.formBuilder.group({
      searchType:['',[Validators.required]],
      code:['',[]],
      name:['',[]],
    });
  }
  /**Eventos del buscador */
  selectEvent(item) {}
  onChangeSearch($event){}

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
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }

  public editarAgenda(element){
    AuxiliarEditarProgramacionComponent.recibido = element;
    this.router.navigateByUrl('programacion/editar');
  }

  public agendarOnclick(){
    this.router.navigateByUrl('programacion/crear');
  }

}
