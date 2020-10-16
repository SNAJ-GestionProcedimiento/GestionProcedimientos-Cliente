export class especialidadesRequeridas {
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
  public nombreEspecialista: number;
  /**
   * Genero del paciente
   */
  public estado: string;

   public static cant: number;
  constructor() { 
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): especialidadesRequeridas {
    if (json.length == 0) { return null; }
    var especialidadRequerida = new especialidadesRequeridas();
    especialidadRequerida.codigoEspecialidad = json.agendaEspecialista[0].código;
    especialidadRequerida.nombreEspecialidad = json.especialidad[0].nombreEspecialidad;
    especialidadRequerida.registroMedico = json.especialista[0].registroMedico;
    especialidadRequerida.identificacion = json.persona[0].identificacion;
    especialidadRequerida.nombreEspecialista = json.persona[0].nombreEspecialista;
    especialidadRequerida.estado = json.agendaEspecialista[0].estado;

    return especialidadRequerida;
  }
}
