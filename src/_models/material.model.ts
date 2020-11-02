export class MaterialRequerido{
    /*public posicion: number,*/
    public nombreMat: string;
    public codigoMat: number;
    public estadoMat: string;
    public casaMat: string;
    public fechaSolicitudMat: string;
    public fechaEstimadaMat: string;
    public fechaRecibidoMat: string;
    public cantidadMat: number;
    public unidadMat: string;
    public accionesMat: string;

    constructor(){
    }

    public parseToJSON(): JSON {
      return JSON.parse(JSON.stringify(this));
    }
  
    public static fromJSON(json): MaterialRequerido[] {
      console.log("entra a Material Requerido desde material model!!!!!!! ");
      let arrayMaterialesRequeridos = [];
      if (json.length == 0) { return null; }
  
      for (let i = 0; i < json.length; i++) {
        var varMaterialRequerido = new MaterialRequerido();
        varMaterialRequerido.nombreMat = json[i].nombre;
        varMaterialRequerido.codigoMat = json[i].codigoMaterial;
        varMaterialRequerido.estadoMat = json[i].estado;
        varMaterialRequerido.casaMat = json[i].casaMedica;
        varMaterialRequerido.fechaSolicitudMat = json[i].fechaSolicitud;
        varMaterialRequerido.fechaEstimadaMat = json[i].fechaEstimada;
        varMaterialRequerido.fechaRecibidoMat = json[i].fechaRecibido;
        varMaterialRequerido.cantidadMat = json[i].cantidad;
        varMaterialRequerido.unidadMat = json[i].unidad;
      
        arrayMaterialesRequeridos.push(varMaterialRequerido);
      }
      console.log("Retornando array de Materiales requeridos");
      return arrayMaterialesRequeridos;
    }
  }
  
  