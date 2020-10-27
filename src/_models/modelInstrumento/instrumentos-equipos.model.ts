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
    this.cantidad=1;
    this.estado="PEND";
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  } 

  public static fromJSON(json): InstrumentosEquipos[] {
    
    if (json.length == 0) { return null; }
    let instrumentos=[];
    for (let i = 0; i < json.length; i++) {
      var instrumentosEquipos = new InstrumentosEquipos();
      instrumentosEquipos.id = json[i].id;
      instrumentosEquipos.codigoEquipo = json[i].codigoEquipo;
      instrumentosEquipos.nombre = json[i].nombre;
      instrumentosEquipos.descripcion = json[i].descripcion;
      instrumentosEquipos.estado = json[i].estado;
      instrumentosEquipos.cantidad = json[i].cantidad;  
      instrumentos.push(instrumentosEquipos);
    }
    return instrumentos;
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
    editInstrumentosEquipos.id = json.id;
    editInstrumentosEquipos.idAgendaProcedimiento = json.idAgendaProcedimiento;
    editInstrumentosEquipos.codigoEquipo = json.codigoEquipo;
    editInstrumentosEquipos.estado = json.estado;
    editInstrumentosEquipos.cantidad = json.cantidad;

    return editInstrumentosEquipos;
  }

}
