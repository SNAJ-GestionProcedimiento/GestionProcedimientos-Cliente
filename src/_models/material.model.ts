export class MaterialRequerido{
    /*public posicion: number,*/
    public nombre: string;
    public codigoMaterial: number;
    public estado: string;
    public casaMedica: string;
    public fechaSolicitud: string;
    public fechaEstimada: string;
    public fechaRecibido: string;
    public cantidadMat: number;
    public unidad: string;
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
        varMaterialRequerido.nombre = json[i].nombre;
        varMaterialRequerido.codigoMaterial = json[i].codigoMaterial;
        varMaterialRequerido.estado = json[i].estado;
        varMaterialRequerido.casaMedica = json[i].casaMedica;
        varMaterialRequerido.fechaSolicitud = json[i].fechaSolicitud;
        varMaterialRequerido.fechaEstimada = json[i].fechaEstimada;
        varMaterialRequerido.fechaRecibido = json[i].fechaRecibido;
        varMaterialRequerido.cantidadMat = json[i].cantidad;
        varMaterialRequerido.unidad = json[i].unidad;
      
        arrayMaterialesRequeridos.push(varMaterialRequerido);
      }
      return arrayMaterialesRequeridos;
    }
  }
  
  