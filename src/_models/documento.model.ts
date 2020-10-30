import { element } from 'protractor';
export class DocumentoRequerido{
    /*public posicion: number,*/ 
    public codigoDocumento: number; 
    public descripcion: string; 
    public caduca: boolean; 
    public nombre: string; 
    public estado: string; 
    public archivo: string; 
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
        documentoRequerido.codigoDocumento = json[i].codigoDocumento;
        documentoRequerido.nombre = json[i].nombre;
        documentoRequerido.descripcion = json[i].descripcion;
        documentoRequerido.caduca = json[i].caduca;
        documentoRequerido.estado = json[i].estado;
        documentoRequerido.archivo = json[i].archivo;
        documentoRequerido.observacion = json[i].observacion;
        documentoRequerido.fechaDocRecibido = json[i].fechaDocRecibido;
        documentoRequerido.fechaVencimiento = json[i].fechaVencimiento;
        arrayDocumentacionRequerida.push(documentoRequerido);
      }
      return arrayDocumentacionRequerida;
    }
  }
  
  