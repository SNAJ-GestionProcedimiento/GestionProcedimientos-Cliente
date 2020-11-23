
export class DocumentoRequerido{
    /*public posicion: number,*/ 
    public id: number;
    public codigoDocumento: number; 
    public descripcion: string; 
    public caduca: boolean; 
    public nombre: string; 
    public estado: string; 
    public path: string; 
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
    
    constructor(id: number, idProcedimiento: number, codigoDocumento: string, estado: string, observacion: string){
      this.id=id;
      this.codigoDocumento=codigoDocumento;
      this.estado = estado;
      this.idAgendaProcedimiento=idProcedimiento;
      this.observacion = observacion;
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

      return editDocumentos;
    }


  }
 
  