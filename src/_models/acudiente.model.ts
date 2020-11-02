import { DateHelper } from 'src/_helpers/date.helper';
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
     * Tipo de identificacion del acudiente
     */
    public tipoIdentificacion : string;
    /**
     * Fecha naciemiento del acudiente
     */
    public fechaNacimiento : Date;
    /**
     * Correo electronico del acudiente
     */
    public correo : string;
    /**
     * Número de telefono del acudiente
     */
    public telefono : string;
    /**
     * Direccion de residencia del acudiente
     */
    public direccion : string;
    /**
     * Nombre del acudiente
     */
    public nombre : string;
    /**
     * Genero del acudiente
     */
    public genero : string;
    /**
     * Edad del paciente
     */
    public edad : number;

    constructor(){  }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Acudiente {
        if (json.personas.length == 0) { return null;}
        var acudiente  =new Acudiente();

        acudiente.idPersona = json.personas[0].idPersona;
        acudiente.identificacion = json.personas[0].identificacion;
        acudiente.tipoIdentificacion = json.personas[0].tipoIdentificacion;
        acudiente.fechaNacimiento = json.personas[0].fechaNacimiento;
        acudiente.correo = json.personas[0].correo;
        acudiente.telefono = json.personas[0].telefono;
        acudiente.direccion = json.personas[0].direccion;
        acudiente.nombre = json.personas[0].nombre;
        acudiente.genero = json.personas[0].genero;
        acudiente.edad = DateHelper.getAge(new Date(json.personas[0].fechaNacimiento));
        
        return acudiente;
    }
}