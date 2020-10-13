import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VentanaAuxiliarEspecialidadComponent } from '../ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';

@Component({
  selector: 'app-auxiliar-especialista',
  templateUrl: './auxiliar-especialista.component.html',
  styleUrls: ['./auxiliar-especialista.component.css']
})
export class AuxiliarEspecialistaComponent implements OnInit {

  displayedColumns: string[] = ['No', 'codigo', 'nombreEspecialidad', 'registroMedico', 'identificacionEspecialista', 'nombreEspecialistar', 'estado', 'acciones'];
  datos: especialidad[] = [];
  dataSource = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)

      this.datos.push(new especialidad(x, Math.trunc(Math.random() * 1000), `artículo ${x}`, x, x, `artículo ${x}`, `artículo ${x}`, ``));
    this.dataSource = new MatTableDataSource<especialidad>(this.datos);
    this.dataSource.paginator = this.paginator;
  }
  openAgregarEspecialidad(){
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.open(VentanaAuxiliarEspecialidadComponent, dialogoConfig);
  }

}

export class especialidad {
  constructor(public No: number, public codigo: number, public nombreEspecialidad: string, public registroMedico: number, public identificacionEspecialista: number, public nombreEspecialistar: string, public estado: string, public acciones: string) {
  }
}