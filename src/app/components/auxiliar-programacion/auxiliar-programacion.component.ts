import { Component, OnInit, ViewChild } from '@angular/core';
import { AuxiliarEspecialistaComponent } from '../auxiliar-especialista/auxiliar-especialista.component';
import { AuxiliarInstrumentosEquiposComponent } from '../auxiliar-instrumentos-equipos/auxiliar-instrumentos-equipos.component';
@Component({
  selector: 'app-auxiliar-programacion',
  templateUrl: './auxiliar-programacion.component.html',
  styleUrls: ['./auxiliar-programacion.component.css']
})
export class AuxiliarProgramacionComponent implements OnInit {
  
  @ViewChild(AuxiliarInstrumentosEquiposComponent) listarInstrumentos: AuxiliarInstrumentosEquiposComponent;
  @ViewChild(AuxiliarEspecialistaComponent) listarEspecialidad: AuxiliarEspecialistaComponent;
  public edadPaciente:number;
  public activoAcudiente:boolean; 
  message:boolean;

  constructor() { }

  receiveMessage($event) {
    this.message = $event
    console.log($event);
  }

  ngOnInit(): void {
  }

  listarInstrumentosDesdeProgramacion(){
    this.listarInstrumentos.listarIntrumentEquip();
    this.listarEspecialidad.listarEspecialidades();
  }
  crearAgendaonClick(){
    
  }

}
