import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VentanaAuxiliarEspecialidadComponent } from '../ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';
import { EspecilidadRequeridaService }  from 'src/_services/especilidad-requerida.service';
import { especialidadesRequeridas } from 'src/_models/modelEspecialista/especialidad.model';

@Component({
  selector: 'app-auxiliar-especialista',
  templateUrl: './auxiliar-especialista.component.html',
  styleUrls: ['./auxiliar-especialista.component.css']
})
export class AuxiliarEspecialistaComponent implements OnInit {

  displayedColumns: string[] = ['codigoEspecialidad', 'nombreEspecialidad', 'registroMedico', 'identificacion', 'nombreEspecialista', 'estado', 'acciones'];
  dataEspecialidad = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private serviceEspecialidadRequerida: EspecilidadRequeridaService) { }

  ngOnInit(): void {
   
  }

  //método para en listar los equipos asociados a un procedimiento
  public listarEspecialidades() {
    //se llama el servicio del get para que traiga los instrumentos de la base de datos y los guarda en resul como Json
    this.serviceEspecialidadRequerida.getEspecialidadRequerida(5).subscribe((rest: especialidadesRequeridas[])=>{
      console.log(rest);
      this.dataEspecialidad = new MatTableDataSource(rest); //se le envia los datos a la tabla.
    });

  }

  openAgregarEspecialidad(){
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.open(VentanaAuxiliarEspecialidadComponent, dialogoConfig);
  }

}
