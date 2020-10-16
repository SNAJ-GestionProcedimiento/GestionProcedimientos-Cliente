import { estadoClass } from './instrumentos-equipos-estado.model';

export class InstrumentosEquipos {
  /**
   * id de agenda instrumento
   */
  public id: number;
 /**
   * código del instrumento
   */
  public codigoEquipo: number;
  /**
    * Identificador del instrumento
    */
  public nombre: string;
  /**
   * Identificador del procedimiento asociado
   */
  public descripcion: string;
  
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

   public static cant: number;
  constructor() { 
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): InstrumentosEquipos {
    
    if (json.length == 0) { return null; }
    var instrumentosEquipos = new InstrumentosEquipos();
    instrumentosEquipos.id = json.agendaEquipos[0].id;
    instrumentosEquipos.codigoEquipo = json.agendaEquipos[0].codigoEquipo;
    instrumentosEquipos.nombre = json.agendaEquipos[0].nombre;
    instrumentosEquipos.descripcion = json.agendaEquipos[0].descripcion;
    instrumentosEquipos.estado = json.agendaEquipos[0].estado;
    instrumentosEquipos.cantidad = json.agendaEquipos[0].cantidad;

    return instrumentosEquipos;
  }
}

export class editInstrumentosEquipos {
  /**
   * id del instrumento
   */
  public id: number;
  /**
   * id del procedimiento
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

  constructor(id: number, idProcedimiento: number, codigoEquipo: string, estado: string, cantidad: number) { 
    this.id=id;
    this.idAgendaProcedimiento=idProcedimiento;
    this.codigoEquipo=codigoEquipo;
    this.estado=estado;
    this.cantidad=cantidad;
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): editInstrumentosEquipos {
    if (json.agendaEquipo.length == 0) { return null; }
    var editInstrumentosEquipos = new editInstrumentosEquipos();
    editInstrumentosEquipos.id = json.agendaEquipo[0].id;
    editInstrumentosEquipos.idAgendaProcedimiento = json.agendaEquipo[0].idAgendaProcedimiento;
    editInstrumentosEquipos.codigoEquipo = json.agendaEquipo[0].codigoEquipo;
    editInstrumentosEquipos.estado = json.agendaEquipo[0].estado;
    editInstrumentosEquipos.cantidad = json.agendaEquipo[0].cantidad;

    return editInstrumentosEquipos;
  }

}

export class intrumentoEstadoUnidos{
  public intrumento: InstrumentosEquipos[];
  public estados: estadoClass[];
  constructor(intrumento: InstrumentosEquipos[], estados: estadoClass[]){
    this.intrumento=intrumento;
    this.estados=estados;
  }
}