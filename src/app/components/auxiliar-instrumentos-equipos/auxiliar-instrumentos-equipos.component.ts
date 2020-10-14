import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VentanaAuxiliarInstrumentosEquiposComponent } from '../ventana-auxiliar-instrumentos-equipos/ventana-auxiliar-instrumentos-equipos.component';
import { InstrumentosEquiposService } from 'src/_services/instrumentos-equipos.service';
import { InstrumentosEquipos } from 'src/_models/instrumentos-equipos.model';


@Component({
  selector: 'app-auxiliar-instrumentos-equipos',
  templateUrl: './auxiliar-instrumentos-equipos.component.html',
  styleUrls: ['./auxiliar-instrumentos-equipos.component.css']
})
export class AuxiliarInstrumentosEquiposComponent implements OnInit {

  displayedColumns: string[] = ['No', 'codigo', 'nombre', 'cantidad', 'descripcion', 'estado', 'acciones'];
  datos: instrument[] = [];
  dataSource = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private serviceIntrumentosEquipos : InstrumentosEquiposService) { }

  ngOnInit(): void {
    for (let x = 1; x <= 100; x++)

      this.datos.push(new instrument(x, Math.trunc(Math.random() * 1000), `artículo ${x}`, x, `artículo ${x}`, `artículo ${x}`, ``));
    this.dataSource = new MatTableDataSource<instrument>(this.datos);
    this.dataSource.paginator = this.paginator;
  }

  listarIntrumentEquip(){
    this.serviceIntrumentosEquipos.getInstrumentoEquipo(3,1).subscribe((result: InstrumentosEquipos[])=>{
      console.log(result);
    });
    //this.serviceIntrumentosEquipos.get(3,1).subscribe();
  }

  openAgregarIntru() {
    const dialogoConfig = new MatDialogConfig();
    //dialogoConfig.disableClose=true;
    dialogoConfig.autoFocus=true;
    dialogoConfig.width="60%";
    this.dialog.open(VentanaAuxiliarInstrumentosEquiposComponent, dialogoConfig);
  }

  private saveNewCourse() {
    
  }

  ngOnDestroy(): void {
    
  }
}
export class instrument {
  constructor(public No: number, public codigo: number, public nombre: string, public cantidad: number, public descripcion: string, public estado: string, public acciones: string) {
  }
}

