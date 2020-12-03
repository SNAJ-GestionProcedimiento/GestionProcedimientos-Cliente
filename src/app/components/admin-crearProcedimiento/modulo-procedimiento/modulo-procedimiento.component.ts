import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoCama } from 'src/_models/estado-cama.model';
import { obtenerEstado } from 'src/_models/estado-Procedimiento.model';
import { Modalidad } from 'src/_models/modalidad.model';
import { estadoClass } from 'src/_models/modelInstrumento/instrumentos-equipos-estado.model';
import { Procedimiento } from 'src/_models/procedimiento.model';
import { CrearProcedimientoAdmin } from 'src/_models/procedimientoCrearAdmin.model';
import { ProcedimientoModalidad } from 'src/_models/procedimientoModalidad.model';
import { EstadoCamaService } from 'src/_services/estado-cama.service';
import { ProcedimientoService } from 'src/_services/procedimiento.service';
import { EditarComponentesService } from 'src/_services/serviciosComponentes/editar-componentes.service';
import { UtilityServiceService } from 'src/_services/utility-service.service';

@Component({
  selector: 'app-modulo-procedimiento',
  templateUrl: './modulo-procedimiento.component.html',
  styleUrls: ['./modulo-procedimiento.component.css']
})
export class ModuloProcedimientoComponent implements OnInit {


  /**Variables de busqueda autocompletada */
  keyword = 'name';
  data: Array<any>;
  estados: estadoClass[];  //variable que tiene el array de estados  

  /**Variable formulario */
  public busquedaForm: FormGroup;
  public filtroBusqueda: string = '';
  public valorBusqueda: string = '';
  public codigoProc: string = '';
  public estadoCama: string = '';

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
  public idModalidad: string="";
  public idProcedimientoModalidad: string;
  public banderaRequerido: Boolean;

  //validaciones de campos vacios y existentes
  public validacionCodigo: Boolean=false;
  public validacionVacioCodigo: Boolean=false;
  public validacionNombre: Boolean=false;
  public validacionVacioNombre: Boolean=false;
  public camaUCI: Boolean=false;
  public bancoSangre: Boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private procedimientoService: ProcedimientoService,
  ) {
    this.buildbusquedaForm();
  }

  ngOnInit(): void {
    this.procedimiento.modalidades = new Array<ProcedimientoModalidad>();
    this.procedimientoService.getModidalidades().subscribe((res: Modalidad[])=>{
      for (let i = 0; i < res.length; i++) {
        if(res[i].nombre="Consulta Externa"){
          this.idModalidad=res[i].idModalidad;
          break;
        }
      }
    });
    
    this.estados = obtenerEstado.getEstadoObtenidoProcedimiento();
    this.procedimiento.tipo = this.estados[0].valor;
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
      code: ['', []],
      name: ['', []],
      uciBed: ['', []],
      bloodBank: ['', []]
    });
    this.busquedaForm.get('code').valueChanges
      .subscribe(value => {
        let cod=value;        
        this.procedimientoService.getCodigo(cod).subscribe(
          res => {
            this.validacionCodigo=true;
          },
          (errorServicio) => {
            this.validacionCodigo=false;
            this.procedimiento.codigoProcedimiento=cod;
            console.log(cod);
            console.log(this.idModalidad);
          }
        );
        if (cod=="") {
          this.validacionVacioCodigo=true;
        }else{
          this.validacionVacioCodigo=false;
        }
      });
      this.busquedaForm.get('name').valueChanges
      .subscribe(value => {
        console.log(value);
        this.procedimientoService.existeNombreProc(value).subscribe(res => {
          this.validacionNombre=true;
        },
        (errorServicio) => {
          this.procedimiento.nombre=value;
          this.validacionNombre=false;
        }
      );
        if (value=="") {
          this.validacionVacioNombre=true;
        }else{
          this.validacionVacioNombre=false;
        }
      });
    this.busquedaForm.get('uciBed').valueChanges
      .subscribe(value => {
        this.camaUCI=value;
        console.log(this.camaUCI);
      });
    this.busquedaForm.get('bloodBank').valueChanges
      .subscribe(value => {
        this.bancoSangre=value;
      });
  }

  getCrearProcedimiento():CrearProcedimientoAdmin{
    let proced= new CrearProcedimientoAdmin();
    proced.codigoProcedimiento=this.procedimiento.codigoProcedimiento;
    proced.nombre=this.procedimiento.nombre;
    proced.tipo=this.procedimiento.tipo;
    proced.idModalidad=parseInt(this.idModalidad);
    proced.camaUCI=this.camaUCI;
    proced.bancoSangre=this.bancoSangre;
    //console.log(proced);
    return proced;
  }
  
}
