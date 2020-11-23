import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Procedimiento } from 'src/_models/procedimiento.model';
import { EstadoCama } from 'src/_models/estado-cama.model';

import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { EstadoCamaService } from 'src/_services/estado-cama.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';



@Component({
  selector: 'app-procedimiento',
  templateUrl: './procedimiento.component.html',
  styleUrls: ['./procedimiento.component.css']
})
export class ProcedimientoComponent implements OnInit {

  /**Variables de busqueda autocompletada */
  keyword = 'name';
  data: Array<any>;

  /**Variable formulario */
  public busquedaForm: FormGroup;
  public filtroBusqueda: string = '';
  public valorBusqueda: string = '';
  public codigoProc: string = '';
  public estadoCama: string='';

  /**Valriables de control */
  public inputInactivo: string = "false";
  public filtroSeleccionado: boolean = true;
  public inputVacio: boolean = true;
  public busquedaNula: boolean = true;
  public msjBusquedaNula: string = "No existe procedimiento con ";

  /**Valiables de peticiones */
  public procedimientos: Array<Procedimiento>;
  public procedimiento: Procedimiento = new Procedimiento();
  public estadosCama: Array<EstadoCama>;
  public idModalidad: string;
  public idProcedimientoModalidad: string;
  public banderaRequerido: Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private procedimientoService: ProcedimientoService,
    private estadoCamaService: EstadoCamaService,
    private utilityService: UtilityServiceService,
    private editarComponentesService: EditarComponentesService
  ) {
    this.buildbusquedaForm();
  }

  ngOnInit(): void {
    this.estadoCama = this.busquedaForm.get('stateBed').value;
    this.setEstadosCama();
    /**Carga de talbas */
    this.utilityService.customIdModalidad.subscribe(msg => this.idModalidad = msg);
    this.utilityService.customIdProcedimientoModalidad.subscribe(msg => this.idProcedimientoModalidad = msg);
    this.utilityService.customIdProcedimiento.subscribe(msg => this.codigoProc = msg);
    this.utilityService.customBanderaRequerido.subscribe(msg => this.banderaRequerido = msg);

    /**id de procedimiento desde editar */
    this.editarComponentesService.idProcedimiento.subscribe(value => {
      if (value != '') {
        this.codigoProc = value;
        this.inputInactivo = "true";
        this.busquedaForm.get('searchType').disable();
        this.setProcedimiento();
        console.log('deberia editar');
      }
    })
  }

  /**Gets y Sets */
  public getObjProcedimiento() {
    return this.procedimiento;
  }
  public getestadoCama() {
    return this.estadoCama;
  }
  public getCodigoProcedimiento() {
    if (this.procedimiento != null) {
      return this.procedimiento.codigoProcedimiento;
    } else {
      return "";
    }
  }

  /**Metodos de formularios */
  private buildbusquedaForm() {
    this.busquedaForm = this.formBuilder.group({
      searchType: ['', [Validators.required]],
      code: ['', []],
      name: ['', []],
      uciBed: ['', []],
      bloodBank: ['', []],
      stateBed: ['PEND', []]
    });
    this.busquedaForm.get('searchType').valueChanges
      .subscribe(value => {
        this.filtroBusqueda = value;
        this.filtroSeleccionado = true;
        if (value == '2' && this.valorBusqueda != '') {
          this.setProcedimientos();
        }
      })
    this.busquedaForm.get('uciBed').valueChanges
      .subscribe(value => {
        if (this.procedimiento != null && this.procedimiento.modalidades.length > 0) {
          this.procedimiento.modalidades[0].camaUCI = value;
        }
      });
    this.busquedaForm.get('bloodBank').valueChanges
      .subscribe(value => {
        if (this.procedimiento != null && this.procedimiento.modalidades.length > 0) {
          this.procedimiento.modalidades[0].bancoSangre = value;
        }
      });
    this.busquedaForm.get('stateBed').valueChanges
      .subscribe(value => {
        this.estadoCama = value;
      });
  }

  private updateBusquedaForm() {
    this.busquedaForm.get('code').setValue(this.procedimiento.codigoProcedimiento);

    this.busquedaForm.get('name').setValue(this.procedimiento.nombre);
    if (this.procedimiento.modalidades.length > 0) {
      this.busquedaForm.get('uciBed').setValue(this.procedimiento.modalidades[0].camaUCI);
      this.busquedaForm.get('bloodBank').setValue(this.procedimiento.modalidades[0].bancoSangre);
      if (this.procedimiento.modalidades[0].camaUCI) {
        this.busquedaForm.get('uciBed').disable();
      } else {
        this.busquedaForm.get('uciBed').enable();
      }
      if (this.procedimiento.modalidades[0].bancoSangre) {
        this.busquedaForm.get('bloodBank').disable();
      } else {
        this.busquedaForm.get('bloodBank').enable();
      }
    } else {
      this.busquedaForm.get('uciBed').setValue(false);
      this.busquedaForm.get('bloodBank').setValue(false);
    }
  }

  /**Metodos de busqueda autocompletada */
  selectEvent(item) {
    this.codigoProc = item.id;
    this.setProcedimiento();
  }

  onChangeSearch($event) {
    if ($event != '') {
      this.inputVacio = true;
      if (this.filtroBusqueda != '') {
        if (this.filtroBusqueda == '1') {
          this.codigoProc = $event;
        } else {
          this.valorBusqueda = $event;
          this.setProcedimientos();
        }
      } else {
        this.codigoProc = $event;
        this.valorBusqueda = $event;
      }
    } else {
      this.inputVacio = false;
    }
  }

  cargarNombres() {
    this.data = new Array();
    this.procedimientos.forEach(procedimiento => {
      this.data.push({ id: procedimiento.codigoProcedimiento, name: procedimiento.nombre });
    });
  }

  /**Metodos de los botones */
  public buscarClick() {
    if (this.codigoProc != '' && this.filtroBusqueda != '') {
      this.setProcedimiento();
    } else {
      console.log(this.codigoProc);
      if (this.filtroBusqueda == '' && this.codigoProc == '') {
        this.filtroSeleccionado = false;
        this.inputVacio = false;
      } else {
        if (this.filtroBusqueda != '') {
          this.inputVacio = false;
        }
        if (this.codigoProc != '') {
          this.filtroSeleccionado = false;
        }
      }
    }
  }

  /**Peticiones */
  async setProcedimiento() {
    let res: any = await this.procedimientoService.getCodigo(this.codigoProc).toPromise();
    /**TODO:Capturar el error. que venga del servidor */
    if (res != null) {
      this.procedimiento = Procedimiento.fromJSON(res.procedimiento);
      if (this.procedimiento != null) {
        this.updateBusquedaForm();
        this.idModalidad = this.procedimiento.modalidades[0].idModalidad_id.toString();
        this.idProcedimientoModalidad = this.procedimiento.modalidades[0].idProcedimientoModalidad.toString();
        this.utilityService.changeIdProcedimiento(this.codigoProc);
        this.utilityService.changeIdModalidad(this.idModalidad);
        this.utilityService.changeBanderaRequerido(this.banderaRequerido);
      }
      this.procedimientos = new Array<Procedimiento>();
    } else {
      this.msjBusquedaNula += 'codigo:' + this.codigoProc;
      this.busquedaNula = false;
    }
  }

  async setProcedimientos() {
    let res: any = await this.procedimientoService.getNombre(this.valorBusqueda).toPromise();
    this.procedimientos = new Array<Procedimiento>();
    res.procedimientos.forEach(procedimiento => {
      this.procedimientos.push(procedimiento);
    });
    this.procedimiento = null;
    this.data = this.procedimientos;
    if (this.procedimientos.length > 0) {
      this.cargarNombres();
    }
  }

  async setEstadosCama() {
    let res: any = await this.estadoCamaService.get().toPromise();
    this.estadosCama = EstadoCama.fromJSON(res);
  }
}
