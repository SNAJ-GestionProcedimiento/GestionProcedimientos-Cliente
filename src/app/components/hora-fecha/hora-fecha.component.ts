import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Sala } from 'src/_models/sala.model';
import { EstadoAgenda } from 'src/_models/estado-agenda.model';
import { Agendamiento } from 'src/_models/agendamiento.models';

import { SalaService } from 'src/_services/sala.service';
import { EstadoAgendaService } from 'src/_services/estado-agenda.service';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';

import { DateHelper } from 'src/_helpers/date.helper';
import { EstadoSala } from '../../../_models/estado-sala.model';
import { EstadoSalaService } from '../../../_services/estado-sala.service';
import { AgendaObtenerService } from 'src/_services/serviciosAgenda/agenda-obtener.service';

@Component({
  selector: 'app-hora-fecha',
  templateUrl: './hora-fecha.component.html',
  styleUrls: ['./hora-fecha.component.css']
})
export class HoraFechaComponent implements OnInit {

  public horafechaForm:FormGroup;
  public estadosAgenda:Array<EstadoAgenda>;
  public salas:Array<Sala>;
  public estadosSalas:Array<EstadoSala>;

  public agendamiento:Agendamiento = new Agendamiento();
  public fechaActual:string;

  constructor(
    private formBuilder:FormBuilder,
    private salaService: SalaService,
    private estadoAgendaService:EstadoAgendaService,
    private estadoSalaService:EstadoSalaService,
    private editarComponentesService:EditarComponentesService,
    public agendaObtenerService:AgendaObtenerService
    ) { 
    this.buildHorafechaForm();
  }

  ngOnInit(): void {
    this.setSalas();
    this.setEstadosAgenda();
    this.setEstadosSala();
    this.agendamiento.estadoAgenda=this.horafechaForm.get('stateSchedule').value;
    this.agendamiento.estadoSala=this.horafechaForm.get('stateSala').value;
    this.fechaActual = DateHelper.dateToStr(new Date());

    /**Activado en editar */
    this.editarComponentesService.idAgendaProc.subscribe(value=>{
      if(value!=''){
        this.setAgendamiento(value);
      }
    })
  }

  public buildHorafechaForm(){
    this.horafechaForm = this.formBuilder.group({
      date:['',[Validators.required]],
      hour:['',[Validators.required]],
      state:['',[]],
      room:['',[Validators.required]],
      stateSchedule:['PEND',[]],
      stateSala:[[],[]]
    });
    this.horafechaForm.get('date').valueChanges
    .subscribe(value =>{
      this.agendamiento.fecha = value;
    });
    this.horafechaForm.get('hour').valueChanges
    .subscribe(value =>{
      this.agendamiento.hora = value;
    });
    this.horafechaForm.get('stateSchedule').valueChanges
    .subscribe(value =>{
      this.agendamiento.estadoAgenda = value;
    });
    this.horafechaForm.get('room').valueChanges
    .subscribe(value=>{
      this.agendamiento.idSala =value;
    });
    this.horafechaForm.get('stateSala').valueChanges
    .subscribe(value=>{
      this.agendamiento.estadoSala =value;
    });
  }

  public CompleteForm(){
    this.horafechaForm.get('date').setValue(this.agendamiento.fecha);
    this.horafechaForm.get('hour').setValue(this.agendamiento.hora);
    this.horafechaForm.get('stateSchedule').setValue(this.agendamiento.estadoAgenda);
    this.horafechaForm.get('room').setValue(this.agendamiento.idSala);
    this.horafechaForm.get('stateSala').setValue(this.agendamiento.estadoSala);
  }

  /**Gets */
  public getAgendamiento(){
    return this.agendamiento;
  }

  /**Peticiones */
  public async setSalas(){
    let res:any = await this.salaService.list().toPromise();
    this.salas = new Array<Sala>();
    res.forEach(sala => {
      this.salas.push(Sala.fromJSON(sala));
    });
  }

  public async setEstadosAgenda(){
    let res:any = await this.estadoAgendaService.get().toPromise();
    this.estadosAgenda = EstadoAgenda.fromJSON(res);
  }

  public async setEstadosSala(){
    let res:any = await this.estadoSalaService.get().toPromise();
    this.estadosSalas = EstadoSala.fromJSON(res);
  }
  
  public async setAgendamiento(idAgendaProcedimiento:string){
    let res = await this.agendaObtenerService.get(idAgendaProcedimiento).toPromise();
    this.agendamiento = Agendamiento.fromJSON(res);
    if(this.agendamiento!=null){
      this.CompleteForm();
    }
  }

} 
