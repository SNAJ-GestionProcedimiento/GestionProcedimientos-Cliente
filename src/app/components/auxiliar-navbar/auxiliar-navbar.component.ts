import { Component, OnInit } from '@angular/core';
import { NumeroNotificacionesService } from 'src/_services/numero-notificaciones.service';

@Component({
  selector: 'app-auxiliar-navbar',
  templateUrl: './auxiliar-navbar.component.html',
  styleUrls: ['./auxiliar-navbar.component.css']
})
export class AuxiliarNavbarComponent implements OnInit {

  numeroNotificaciones: number;

  constructor(
    private numNotificacion: NumeroNotificacionesService
  ) { }

  ngOnInit(): void {
    this.numNotificacion.customNumeroNotificaciones.subscribe(msg => this.numeroNotificaciones = msg);
  }

  clickNotificacion() {
    this.numNotificacion.changeBandera(this.numeroNotificaciones);
  }

}
