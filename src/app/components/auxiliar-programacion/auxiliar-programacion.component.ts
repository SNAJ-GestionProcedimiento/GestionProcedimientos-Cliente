import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auxiliar-programacion',
  templateUrl: './auxiliar-programacion.component.html',
  styleUrls: ['./auxiliar-programacion.component.css']
})
export class AuxiliarProgramacionComponent implements OnInit {
  
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

}
