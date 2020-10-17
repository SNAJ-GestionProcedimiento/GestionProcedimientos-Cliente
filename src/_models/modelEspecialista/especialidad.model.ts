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

  public static fromJSON(json): especialidadesRequeridas[] {
    console.log("entra");
    let arrayEspecialidades = [];
    if (json.length == 0) { return null; }

    for (let i = 0; i < json.length; i++) {
      var especialidadRequerida = new especialidadesRequeridas();
      especialidadRequerida.codigoEspecialidad = json[i].codigoEspecialidad;
      especialidadRequerida.nombreEspecialidad = json[i].nombreEspecialidad;
      especialidadRequerida.registroMedico = json[i].registroMedico;
      especialidadRequerida.identificacion = json[i].identificacion;
      especialidadRequerida.nombreEspecialista = json[i].nombreEspecialista;
      especialidadRequerida.estado = json[i].estado;
      console.log("intrument "+i+": "+ especialidadRequerida);
      arrayEspecialidades.push(especialidadRequerida);
    }
    return arrayEspecialidades;
  }
}

