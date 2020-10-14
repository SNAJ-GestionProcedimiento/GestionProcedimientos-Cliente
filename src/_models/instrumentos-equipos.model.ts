export class InstrumentosEquipos {
  /**
    * Identificador del instrumento
    */
  public id: number;
  /**
   * Identificador del procedimiento asociado
   */
  public idAgendaProcedimiento: number;
  /**
   * código del instrumento
   */
  public codigoEquipo: string;
  /**
   * Estado del procedimiento
   */
  public estado: string;
  /**
   * Cantidad de instrumentos
   */
  public cantidad: number;
  /**
   * Genero del paciente
   */

  constructor() { }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): InstrumentosEquipos {
    if (json.agendaEquipos.length == 0) { return null; }
    var instrumentosEquipos = new InstrumentosEquipos();

    instrumentosEquipos.id = json.agendaEquipos[0].id;
    instrumentosEquipos.idAgendaProcedimiento = json.agendaEquipos[0].idAgendaProcedimiento;
    instrumentosEquipos.codigoEquipo = json.agendaEquipos[0].codigoEquipo;
    instrumentosEquipos.estado = json.agendaEquipos[0].estado;
    instrumentosEquipos.cantidad = json.agendaEquipos[0].cantidad;

    return instrumentosEquipos;
  }
}
