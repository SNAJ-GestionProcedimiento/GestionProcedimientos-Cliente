export class DocumentoRequerido{
    /*public posicion: number,*/ 
    public codigoDoc: number; 
    public descripcionDoc: string; 
    public caducaDoc: boolean; 
    public nombreDoc: string; 
    public estadoDoc: string; 
    public archivoDoc: string; 
    public observacionDoc: string;
    public fechaRecibidoDoc: string;
    public fechaVencimientoDoc: string;
    constructor(){
    }

    public parseToJSON(): JSON {
      return JSON.parse(JSON.stringify(this));
    }
  
    public static fromJSON(json): DocumentoRequerido[] {
      console.log("entra a Documento Requerido desde Documento model!!!!!!! ");
      let arrayDocumentacionRequerida = [];
      if (json.length == 0) { return null; }
  
      for (let i = 0; i < json.length; i++) {
        var documentoRequerido = new DocumentoRequerido();
        documentoRequerido.codigoDoc = json[i].codigo;
        documentoRequerido.nombreDoc = json[i].codigoDocumento;
        documentoRequerido.descripcionDoc = json[i].descripcion;
        documentoRequerido.caducaDoc = json[i].caduca;
        documentoRequerido.estadoDoc = json[i].estado;
        documentoRequerido.archivoDoc = json[i].archivo;
        documentoRequerido.observacionDoc = json[i].observacion;
        arrayDocumentacionRequerida.push(documentoRequerido);
      }
      console.log("Retornando array de documentacion requerida");
      return arrayDocumentacionRequerida;
    }
  }
  
  