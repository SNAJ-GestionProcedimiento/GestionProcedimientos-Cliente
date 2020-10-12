import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auxiliar-home',
  templateUrl: './auxiliar-home.component.html',
  styleUrls: ['./auxiliar-home.component.css']
})
export class AuxiliarHomeComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    let pagina = document.getElementById("programacion");
    pagina.style.display = "none";
  }

  visibilidad() {
    
  }

  private mostrarAgenda():void {
    let pagina = document.getElementById("agenda");
    pagina.style.display = "block";
    pagina = document.getElementById("programacion");
    pagina.style.display = "none";
    let boton = document.getElementById("nuevoPro");
    boton.style.display = "block";
  }
  private nuevoProcedimiento():void {
    let pagina = document.getElementById("agenda");
    pagina.style.display = "none";
    pagina = document.getElementById("programacion");
    pagina.style.display = "block";

    let boton = document.getElementById("nuevoPro");
    boton.style.display = "none";
  }

}
