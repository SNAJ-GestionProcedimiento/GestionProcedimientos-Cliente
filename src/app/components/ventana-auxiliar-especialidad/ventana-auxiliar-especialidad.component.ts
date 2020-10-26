import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-ventana-auxiliar-especialidad',
  templateUrl: './ventana-auxiliar-especialidad.component.html',
  styleUrls: ['./ventana-auxiliar-especialidad.component.css']
})
export class VentanaAuxiliarEspecialidadComponent implements OnInit {

  displayedColumns: string[] = ['No', 'codigo', 'nombreEspecialidad', 'cantidad', 'acciones'];
  datos: especialidad[] = [];
  dataSource = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog) { } 

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)

      this.datos.push(new especialidad(x, Math.trunc(Math.random() * 1000), `artículo ${x}`, x, ``));
    this.dataSource = new MatTableDataSource<especialidad>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
  }

  cancelar(){
    this.dialog.closeAll();

  }
}



export class especialidad {
  constructor(public No: number, public codigo: number, public nombreEspecialidad: string, public cantidad: number, public acciones: string) {
  }
}
