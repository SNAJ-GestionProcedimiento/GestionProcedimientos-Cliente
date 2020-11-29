export class MaterialRequerido{
    /*public posicion: number,*/
    public id: number;
    public nombre: string;
    public codigoMaterial: string;
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
      let arrayMaterialesRequeridos = [];
      if (json.length == 0) { return null; }
      for (let i = 0; i < json.length; i++) {
        var varMaterialRequerido = new MaterialRequerido();
        varMaterialRequerido.id = json[i].id;
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
  
  
export class editarMateriales {
  public id: number;
  public nombre: string;
  public codigoMaterial: string;
  public estado: string;
  public fechaSolicitud: string;
  public fechaEstimada: string;
  public fechaRecibido: string;
  public idAgendaProcedimiento: number;
  public casaMedica: string;



  constructor(id: number, idProcedimiento: number, codigoMaterial: string, estado: string, fechaSolicitud: string, fechaEstimada: string, fechaRecibido: string, casaMedica: string) { 
    this.id=id;
    this.idAgendaProcedimiento=idProcedimiento;
    this.codigoMaterial=codigoMaterial;
    this.estado=estado;
    this.fechaEstimada=fechaEstimada;
    this.fechaRecibido=fechaRecibido;
    this.fechaSolicitud=fechaSolicitud;
    this.casaMedica = casaMedica;
  }
 
  public parseToJSON(): JSON {
    return JSON.parse(JSON.stringify(this));
  } 
 
  public static fromJSON(json): editarMateriales {
    if (json.agendaMaterial.length == 0) { return null; }
    var editarMateriales = new editarMateriales();
    editarMateriales.id = json.id;
    editarMateriales.idAgendaProcedimiento = json.idAgendaProcedimiento;
    editarMateriales.codigoMaterial = json.codigoMaterial;
    editarMateriales.estado = json.estado;
    editarMateriales.fechaSolicitud = json.fechaSolicitud;
    editarMateriales.fechaEstimada = json.fechaEstimada;
    editarMateriales.fechaRecibido = json.fechaRecibido;
    editarMateriales.casaMedica = json.casaMedica;

    return editarMateriales;
  }

}
