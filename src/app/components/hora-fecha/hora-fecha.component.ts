import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sala } from 'src/_models/sala.model';
import { EstadoAgenda } from 'src/_models/estado-agenda.model';

import { SalaService } from 'src/_services/sala.service';
import { EstadoAgendaService } from 'src/_services/estado-agenda.service';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-hora-fecha',
  templateUrl: './hora-fecha.component.html',
  styleUrls: ['./hora-fecha.component.css']
})
export class HoraFechaComponent implements OnInit {

  public horafechaForm:FormGroup;
  public estadosAgenda:Array<EstadoAgenda>;
  public salas:Array<Sala>;

  public idsala:string;
  public hora:string;
  public fecha:string;
  public estadoFecha:string;

  constructor(
    private formBuilder:FormBuilder,
    private salaService: SalaService,
    private estadoAgendaService:EstadoAgendaService
    ) { 
    this.buildHorafechaForm();
  }

  ngOnInit(): void {
    this.setSalas();
    this.setEstadosAgenda();
    this.estadoFecha=this.horafechaForm.get('stateSchedule').value;
  }

  public buildHorafechaForm(){
    this.horafechaForm = this.formBuilder.group({
      date:['',[Validators.required]],
      hour:['',[Validators.required]],
      state:['',[]],
      room:['',[Validators.required]],
      stateSchedule:['PEND',[]]
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
      console.log(value);
      this.estadoFecha = value;
    });
    this.horafechaForm.get('room').valueChanges
    .subscribe(value=>{
      this.idsala =value;
    });
  }

  public getElemento(nombre:string){
    switch(nombre){
      case 'hora':
        return this.hora;
      case 'fecha':
         return this.fecha;
      case 'estado':
         return this.estadoFecha;
      case 'salaId':
         return this.idsala;
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

}
