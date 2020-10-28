import { newArray } from '@angular/compiler/src/util';

export class Paciente{
    /**
     * Identificador del objeto Persona
     */
    public idPersona : string;
    /**
     * Identificador del paciente
     */
    public identificacion : string;
    /**
     * Tipo de identificacion del paciente
     */
    public tipoIdentificacion : string;
    /**
     * Fecha naciemiento del paciente
     */
    public fechaNacimiento : Date;
    /**
     * Correo electronico del paciente
     */
    public correo : string;
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
    public genero : string;

    constructor(){  }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json): Paciente {
        if (json.personas.length == 0) { return null;}
        var paciente  =new Paciente();

        paciente.idPersona = json.personas[0].idPersona;
        paciente.identificacion = json.personas[0].identificacion;
        paciente.tipoIdentificacion = json.personas[0].tipoIdentificacion;
        paciente.fechaNacimiento = json.personas[0].fechaNacimiento;
        paciente.correo = json.personas[0].correo;
        paciente.telefono = json.personas[0].telefono;
        paciente.direccion = json.personas[0].direccion;
        paciente.nombre = json.personas[0].nombre;
        paciente.genero = json.personas[0].genero;
        
        return paciente;
    }

    public static listPaciente(json):Paciente[]{
        if (json.personas.length == 0) { return null;}
        let pacientes=new Array<Paciente>();
        json.personas.forEach(element => {
            var paciente  =new Paciente();
            paciente.idPersona = element.idPersona;
            paciente.identificacion = element.identificacion;
            paciente.tipoIdentificacion = element.tipoIdentificacion;
            paciente.fechaNacimiento = element.fechaNacimiento;
            paciente.correo = element.correo;
            paciente.telefono = element.telefono;
            paciente.direccion = element.direccion;
            paciente.nombre = element.nombre;
            paciente.genero = element.genero;

            pacientes.push(paciente);
        });
        return pacientes;
    }
}

