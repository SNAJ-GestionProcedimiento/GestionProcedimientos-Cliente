import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrearProcedimientoAdmin } from 'src/_models/procedimientoCrearAdmin.model';
import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { ModuloDocumentacionComponent } from '../modulo-documentacion/modulo-documentacion.component';
import { ModuloEspecialidadComponent } from '../modulo-especialidad/modulo-especialidad.component';
import { ModuloInstrumentoComponent } from '../modulo-instrumento/modulo-instrumento.component';
import { ModuloMaterialComponent } from '../modulo-material/modulo-material.component';
import { ModuloProcedimientoComponent } from '../modulo-procedimiento/modulo-procedimiento.component';
import swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-modulo-principal-crear-procedimiento',
  templateUrl: './modulo-principal-crear-procedimiento.component.html',
  styleUrls: ['./modulo-principal-crear-procedimiento.component.css']
})
export class ModuloPrincipalCrearProcedimientoComponent implements OnInit {

  @ViewChild(ModuloProcedimientoComponent) procedimiento: ModuloProcedimientoComponent;
  @ViewChild(ModuloDocumentacionComponent) documentos: ModuloDocumentacionComponent;
  @ViewChild(ModuloMaterialComponent) materiales: ModuloMaterialComponent;
  @ViewChild(ModuloInstrumentoComponent) instrumentos: ModuloInstrumentoComponent;
  @ViewChild(ModuloEspecialidadComponent) especial: ModuloEspecialidadComponent;

  constructor(
    private router: Router,
    private crearProcedimiento: ProcedimientoService,
    private dialogo: MatDialog
  ) { }

  ngOnInit(): void {
  }

  crearProcedimientoOnClick() {
    let proced = new CrearProcedimientoAdmin();
    proced = this.procedimiento.getCrearProcedimiento();
    proced.documentacionRequerida = this.documentos.getDocumentosRequeridos();
    proced.materialesRequeridos = this.materiales.getMaterialesRequeridos();
    proced.equiposRequeridos = this.instrumentos.getInstrumentosRequeridos();
    proced.especialidadesRequeridas = this.especial.getEspecialidadesRequeridas();
    //console.log(JSON.stringify(proced));
    this.crearProcedimiento.crearProcedimiento(proced).subscribe(res => {
      swal.fire('¡Exito!', 'Se creo el procedimiento correctamente!', 'success');
      this.router.navigateByUrl('admin/procedimiento');
    },
      (errorServicio) => {
        swal.fire('¡Error!', '¡Verifica los datos del procedimiento a crear!', 'error');
      }
    );
  }

  public gestionProcedimientoOnclick() {
    this.dialogo
      .open(ConfirmationDialogComponent, {
        data: `¿Desea salir de la ventana creación de procedimiento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log("entre");
          this.router.navigateByUrl('/admin');
        }
      });
  }

}
