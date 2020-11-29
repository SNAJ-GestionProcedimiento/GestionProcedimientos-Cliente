import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulo-principal-crear-procedimiento',
  templateUrl: './modulo-principal-crear-procedimiento.component.html',
  styleUrls: ['./modulo-principal-crear-procedimiento.component.css']
})
export class ModuloPrincipalCrearProcedimientoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  crearProcedimientoOnClick(){
    
  }

  gestionProcedimientoOnclick(){
    this.router.navigateByUrl('admin/procedimiento');
  }

}
