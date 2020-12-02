import { estadoClass } from './modelInstrumento/instrumentos-equipos-estado.model';

  export class obtenerEstado{
    estados: estadoClass[] = [];  //variable que tiene el array de estados
    constructor(){};
  
    //Método para obtener los estados.
    public static getEstadoObtenidoProcedimiento():  estadoClass[]{
      var estados = [];
       let estado = {
        valor: "CMA",
        contenido: "Cirugia mayor"
      };
      estados.push(estado);
      estado = {
        valor: "CME",
        contenido: "Cirugia menor"
      };
      estados.push(estado);
      estado = {
        valor: "CAM",
        contenido: "Cirugia ambulatoria"
      };
      estados.push(estado);
      return estados;
    }
  }