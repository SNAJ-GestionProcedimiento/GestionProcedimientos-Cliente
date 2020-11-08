//import { especialidad } from 'src/app/components/auxiliar-especialidad/ventana-auxiliar-especialidad/ventana-auxiliar-especialidad.component';

export class especialidadesRequeridas {
  /**
   * id Agenda especialista 
   * */
  public id: number;
  /**
   * código de especialidad
   */
  public codigoEspecialidad: string;
  /**
    * nombre especialidad
    */
  public nombreEspecialidad: string;
  /**
   * registro médico de Especialista
   */
  public registroMedico: string;

  /**
   * Identificación del especialista
   */
  public identificacion: string;
  /**
   * Nombre del especialista
   */
  public nombreEspecialista: string;
  /**
   * Genero del paciente
   */
  public estado: string;

  
  public cantidad: number;

  public requerido: boolean;

  constructor() {
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): especialidadesRequeridas[] {
    let arrayEspecialidades = [];
    if (json.length == 0) { return null; }

    for (let i = 0; i < json.length; i++) {
      var especialidadRequerida = new especialidadesRequeridas();
      especialidadRequerida.id = json[i].id;
      especialidadRequerida.codigoEspecialidad = json[i].codigoEspecialidad;
      especialidadRequerida.nombreEspecialidad = json[i].nombreEspecialidad;
      especialidadRequerida.registroMedico = json[i].registroMedico;
      especialidadRequerida.identificacion = json[i].identificacion;
      especialidadRequerida.nombreEspecialista = json[i].nombreEspecialista;
      especialidadRequerida.estado = json[i].estado;
      especialidadRequerida.cantidad=json[i].cantidad;
      especialidadRequerida.requerido=json[i].requerido;
      arrayEspecialidades.push(especialidadRequerida);
    }
    return arrayEspecialidades;
  }
}

export class editarEpecialidadesRequeridas {
  //especialidadRequerida: especialidadesRequeridas;
  /**
   * id Agenda especialista 
   * */
  public id: number;
  /**
   * código de especialidad
   */
  public codigoEspecialidad: string;
  /**
    * nombre especialidad
    */
  public nombreEspecialidad: string;
  /**
   * registro médico de Especialista
   */
  public registroMedico: string;

  /**
   * Identificación del especialista
   */
  public identificacion: string;
  /**
   * Nombre del especialista
   */
  public nombreEspecialista: string;
  /**
   * Genero del paciente
   */
  public estado: string;
  idAgendaProcedimiento: number;
  constructor( id: number,  codigoEspecialidad: string, nombreEspecialidad: string, registroMedico: string,  identificacion: string, nombreEspecialista: string, estado: string, idAgendaProcedimiento: number) {
    //this.especialidadRequerida= especialidadRequerida;
    this.id=id;
    this.codigoEspecialidad=codigoEspecialidad;
    this.nombreEspecialidad=nombreEspecialidad;
    this.registroMedico=registroMedico;
    this.identificacion=identificacion;
    this.nombreEspecialista=nombreEspecialista;
    this.estado=estado;
    this.idAgendaProcedimiento= idAgendaProcedimiento;
  }
}

export class especialidadesPrevisualizar {
  idAgendaProcedimiento: number;
  codigoEspecialidad: string;
  nombre: string;
  cantidad: number;
  estado: string;
  constructor(
    idAgendaProcedimiento: number, 
    codigoEspecialidad: string, 
    nombre: string, 
    cantidad: number,
    estado: string
    )
  {
    this.idAgendaProcedimiento=idAgendaProcedimiento;
    this.codigoEspecialidad=codigoEspecialidad;
    this.nombre=nombre;
    this.cantidad=cantidad;
    this.estado=estado;
  }
}
