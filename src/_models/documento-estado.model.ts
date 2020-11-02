
export interface estadoDocClass {
    valor: string;
    contenido: string;
  }
  
  export class obtenerEstadoDoc{
    estados: estadoDocClass[] = [];  //variable que tiene el array de estados
    constructor(){};
  
    //Método para obtener los estados.
    public static getEstadoObtenido():  estadoDocClass[]{
      var estados = [];
      let estado = {
        valor: "PEND", contenido: "Pendiente"
      };
      estados.push(estado);
      estado = {
        valor: "RECI",
        contenido: "Recibido"
      };
      estados.push(estado);
      estado = {
        valor: "APRO",
        contenido: "Aprobado"
      };
      estados.push(estado);
      estado = {
        valor: "RECH",
        contenido: "Rechazado"
      };
      estados.push(estado);

      return estados;
    }
  } 