export interface estadoMatClass {
    valor: string;
    contenido: string;
  }
  
  export class obtenerEstadoMat{
    estados: estadoMatClass[] = [];  //variable que tiene el array de estados
    constructor(){};
  
    //Método para obtener los estados.
    public static getEstadoObtenidoMateriales(): estadoMatClass[]{
      var estados = [];
      let estado = { 
        valor: "PSOL", contenido: "Por Solicitar"
      };
      estados.push(estado);
      estado = {
        valor: "SOLI",
        contenido: "Solicitado"
      };
      estados.push(estado);
      estado = {
        valor: "RECI",
        contenido: "Recibido"
      };
      estados.push(estado);
      return estados;
    }
  } 