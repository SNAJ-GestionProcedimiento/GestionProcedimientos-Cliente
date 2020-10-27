import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sala } from 'src/_models/sala.model';
import { EstadoAgenda } from 'src/_models/estado-agenda.model';

import { SalaService } from 'src/_services/sala.service';
import { EstadoAgendaService } from 'src/_services/estado-agenda.service';
import { BrowserStack } from 'protractor/built/driverProviders';

import { DateHelper } from 'src/_helpers/date.helper';
import { EstadoSala } from '../../../_models/estado-sala.model';
import { EstadoSalaService } from '../../../_services/estado-sala.service';

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

  public idsala:string;
  public hora:string;
  public fecha:string;
  public estadoFecha:string;
  public fechaActual:string;
  public estadoSala: string;

  constructor(
    private formBuilder:FormBuilder,
    private salaService: SalaService,
    private estadoAgendaService:EstadoAgendaService,
    private estadoSalaService:EstadoSalaService
    ) { 
    this.buildHorafechaForm();
  }

  ngOnInit(): void {
    this.setSalas();
    this.setEstadosAgenda();
    this.setEstadosSala();
    this.estadoFecha=this.horafechaForm.get('stateSchedule').value;
    this.estadoSala=this.horafechaForm.get('stateSala').value;
    this.fechaActual = DateHelper.dateToStr(new Date());
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
      this.fecha = value;
    });
    this.horafechaForm.get('hour').valueChanges
    .subscribe(value =>{
      this.hora = value;
    });
    this.horafechaForm.get('stateSchedule').valueChanges
    .subscribe(value =>{
      console.log("Estado agenda: "+value);
      this.estadoFecha = value;
    });
    this.horafechaForm.get('room').valueChanges
    .subscribe(value=>{
      this.idsala =value;
    });
    this.horafechaForm.get('stateSala').valueChanges
    .subscribe(value=>{
      console.log("Estado sala: "+value);
      this.estadoSala =value;
    });
    
    
  }

  public getElemento(nombre:string){
    console.log("Entré al getElemento de hora y fecha");
    console.log("nombre: "+nombre);
    switch(nombre){

      case 'hora':
        return this.hora;
      case 'fecha':
         return this.fecha;
      case 'estado':
         return this.estadoFecha;
      case 'salaId':
        console.log("estoy en el case salaid"+this.idsala);
         return this.idsala;
      case 'estadoSala':
        console.log("estoy en el case estado sala"+this.estadoSala);
        return this.estadoSala;
      default:
        return null;
    }
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


} 
