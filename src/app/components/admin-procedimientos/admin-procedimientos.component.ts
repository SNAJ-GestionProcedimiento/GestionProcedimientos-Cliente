import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-procedimientos',
  templateUrl: './admin-procedimientos.component.html',
  styleUrls: ['./admin-procedimientos.component.css']
})
export class AdminProcedimientosComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  buscarOnclick(){

  }

  agregarProcedimientoOnclick(){
    this.router.navigateByUrl('admin/procedimiento/crear');
  }

}
