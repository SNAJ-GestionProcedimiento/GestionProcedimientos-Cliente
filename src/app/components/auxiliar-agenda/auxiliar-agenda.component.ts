import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProcedimientoAgenda } from 'src/_models/procedimiento-agenda.model';

import { AgendaProcedimientoService } from 'src/_services/agenda-procedimiento.service';

import { DateHelper } from 'src/_helpers/date.helper';

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
    'acciones'
    ];
  public dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private agendaProcedimientoService:AgendaProcedimientoService,
    private formBuilder:FormBuilder
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
  selectEvent(item) {}
  onChangeSearch($event){}

  /**Eventos */
  public editarAgenda(element){
    console.log(element);
  }

  /**Peticiones */
  public async getAgendas(){
    let res:any = await this.agendaProcedimientoService.list().toPromise();
    if(res!=null){
      this.agenda = new Array<ProcedimientoAgenda>();
      console.log(res)
      res.forEach(element => {
        let procAgenda = new ProcedimientoAgenda(
          element.fechaHora,
          element.fechaHora,
          element.codigoProcedimiento,
          element.nombreProcedimiento,
          element.tipoProcedimiento,
          '',
          '',
          element.identificacionPac,
          ''
        );
        this.agenda.push(procAgenda);
      });
      this.dataSource = new MatTableDataSource<any>(this.agenda);
      this.dataSource.paginator = this.paginator;
    }
  }
}
