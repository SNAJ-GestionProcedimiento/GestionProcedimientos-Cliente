export class Acudiente{
    /**
     * Identificador del objeto Persona
     */
    public idPersona : string;
    /**
     * Identificador del acudiente
     */
    public identificacion : string;
    /**
     * Número de telefono del paciente
     */
    public telefono : string;
    /**
     * Direccion de residencia del paciente
     */
    public direccion : string;
    /**
     * Nombre del paciente
     */
    public nombre : string;
    /**
     * Genero del paciente
     */

     constructor(){ }

     public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Acudiente {
        if (json.personas.length == 0) { return null;}
        var acudiente  =new Acudiente();

        acudiente.idPersona = json.personas[0].idPersona;
        acudiente.identificacion = json.personas[0].identificacion;
        acudiente.telefono = json.personas[0].telefono;
        acudiente.direccion = json.personas[0].direccion;
        acudiente.nombre = json.personas[0].nombre;
        
        return acudiente;
    }
}