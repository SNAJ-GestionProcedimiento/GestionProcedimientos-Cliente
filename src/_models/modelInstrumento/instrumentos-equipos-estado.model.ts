export class InstrumentosEquiposEstado {
  /**
   * id de agenda instrumento
   */
  public estadosAgendaProc: string[];
  constructor() { }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): InstrumentosEquiposEstado {
    if (json.agendaEquipos.length == 0) { return null; }
    var instrumentosEquipos = new InstrumentosEquiposEstado();
    instrumentosEquipos.estadosAgendaProc = json.agendaEquipos[0].estado;

    return instrumentosEquipos;
  }
}

export interface estadoClass{
  valor: string;
  contenido: string;
}