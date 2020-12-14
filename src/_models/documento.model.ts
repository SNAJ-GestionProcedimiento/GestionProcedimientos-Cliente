
export class DocumentoRequerido{
  /*public posicion: number,*/ 
  public id: number;
  public codigoDocumento: string; 
  public descripcion: string; 
  public caduca: boolean; 
  public nombre: string; 
  public estado: string; 
  public path: File; 
  public observacion: string;
  public fechaDocRecibido: string;
  public fechaVencimiento: string;
  constructor(){ 
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  } 
 
  public static fromJSON(json): DocumentoRequerido[] {
    let arrayDocumentacionRequerida = [];
    if (json.length == 0) { return null; }
    for (let i = 0; i < json.length; i++) {
      var documentoRequerido = new DocumentoRequerido();
      documentoRequerido.id = json[i].id;
      documentoRequerido.codigoDocumento = json[i].codigoDocumento;
      documentoRequerido.nombre = json[i].nombre;
      documentoRequerido.descripcion = json[i].descripcion;
      documentoRequerido.caduca = json[i].caduca;
      documentoRequerido.estado = json[i].estado;
      documentoRequerido.path = json[i].path;
      documentoRequerido.observacion = json[i].observacion;
      documentoRequerido.fechaDocRecibido = json[i].fechaDocRecibido;
      documentoRequerido.fechaVencimiento = json[i].fechaVencimiento;
      arrayDocumentacionRequerida.push(documentoRequerido);
    }
    return arrayDocumentacionRequerida;
  }
}

export class editarDocumentos{
  public id: number;
  public idAgendaProcedimiento: number;
  public codigoDocumento: string;
  public estado: string;
  public observacion: string;
  public descripcion: string; 
  public caduca: boolean; 
  public nombre: string; 
  public path: File; 
  public fechaDocRecibido: string;
  public fechaVencimiento: string;
  
  constructor(id: number, idAgendaProcedimiento: number, codigoDocumento: string, estado: string, observacion: string, descripcion: string, caduca: boolean, nombre: string, path: File, fechaRecibido: string, fechaVencimiento: string){
    this.id=id;
    this.codigoDocumento=codigoDocumento;
    this.estado = estado;
    this.idAgendaProcedimiento=idAgendaProcedimiento;
    this.observacion = observacion;
    this.descripcion = descripcion;
    this.caduca = caduca;
    this.nombre = nombre;
    this.path = path;
    this.fechaDocRecibido = fechaRecibido;
    this.fechaVencimiento = fechaVencimiento;
  }

  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  }

  public static fromJSON(json): editarDocumentos{
    if(json.agendaDocumento.length == 0){return null;}
    var editDocumentos = new editDocumentos();
    editDocumentos.id = json.id;
    editDocumentos.idAgendaProcedimiento=json.idAgendaProcedimiento;
    editDocumentos.codigoDocumento=json.codigoDocumento;
    editDocumentos.estado = json.estado;
    editDocumentos.observacion = json.observacion;
    editDocumentos.nombre = json.nombre;
    editDocumentos.descripcion = json.descripcion;
    editDocumentos.caduca = json.caduca;
    editDocumentos.path = json.path;
    editDocumentos.fechaDocRecibido = json.fechaDocRecibido;
    editDocumentos.fechaVencimiento = json.fechaVencimiento;

    return editDocumentos;
  }
}

export class previsualizarDocumentos{
  idAgendaProcedimiento: number;
  nombre: string; 
  codigoDocumento: number;
  estado: string;
  observacion: string;

  constructor(
    idAgendaProcedimiento: number,
    nombre: string,
    codigoDocumento: number,
    estado: string,
    observacion: string
  ){
    this.idAgendaProcedimiento=idAgendaProcedimiento;
    this.nombre = nombre;
    this.codigoDocumento = codigoDocumento;
    this.estado = estado;
    this.observacion = observacion;
  }
  
}

