
export interface estadoClass {
  valor: string;
  contenido: string;
}
 
export class obtenerEstado{
  estados: estadoClass[] = [];  //variable que tiene el array de estados
  constructor(){};

  //Método para obtener los estados.
  public static getEstadoObtenido():  estadoClass[]{
    var estados = [];
     let estado = {
      valor: "PEND",
      contenido: "Pendiente"
    };
    estados.push(estado);
    estado = {
      valor: "AGEN",
      contenido: "Agendado"
    };
    estados.push(estado);
    return estados;
  }
}