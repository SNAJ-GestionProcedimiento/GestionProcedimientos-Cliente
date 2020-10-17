import { Paciente } from 'src/_models/paciente.model';
import { Acudiente } from 'src/_models/acudiente.model';
import { ProcedimientoModalidad } from 'src/_models/procedimientoModalidad.model';

import { DateHelper } from 'src/_helpers/date.helper';

export class AgendaCrear{
    /**
     * Campos de paciente
     */
    public identificacionPac: string;
    public tipoIdentificacinPac: string;
    public fechaNacimientoPac: string;
    public correoPac: string;
    public telefonoPac: string;
    public direccionPac: string;
    public nombrePac: string;
    public generoPac: string;
    /**
     * Campos de acudiente
     */
    public identificacionAcu : string;
    public tipoIdentificacionAcu : string;
    public fechaNacimientoAcu : string;
    public correoAcu : string;
    public telefonoAcu : string;
    public direccionAcu : string;
    public nombreAcu : string;
    public generoAcu : string;
    /**
     * Campos de hora y fecha
     */
    public fechaHora: string;
    public estadoFecha: string;
    /**
     * Campos de procedimiento - modalidad
     */
    public cama : string;
    public estadoCama : string;
    public bancoSangre : string;
    public idProcedimientoModalidad : string;
     /**
     * Campo de observación
     */
    public observacion : string;
    /**
     * Campos salas y usuario
     */
    public idSala : string;
    public idUsuario:string='1';

    constructor(
        paciente:Paciente,
        acudiente:Acudiente,
        proceModalidad:ProcedimientoModalidad,
        fecha:string,
        hora:string,
        estadoFecha:string,
        estadoCama:string,
        observacion:string,
        idSala:string,
        idUsuario:string
        ){
            /**Datos Paciente */
            this.identificacionPac = paciente.identificacion;
            this.tipoIdentificacinPac = paciente.tipoIdentificacion;
            this.fechaNacimientoPac = paciente.fechaNacimiento.toString();
            this.correoPac = paciente.correo;
            this.telefonoPac = paciente.telefono;
            this.direccionPac = paciente.direccion;
            this.nombrePac = paciente.nombre;
            this.generoPac = paciente.genero;
            /**Datos Acudiente */
            this.identificacionAcu = acudiente.identificacion; 
            this.tipoIdentificacionAcu = acudiente.tipoIdentificacion; 
            this.fechaNacimientoAcu = acudiente.fechaNacimiento.toString(); 
            this.correoAcu = acudiente.correo; 
            this.telefonoAcu = acudiente.telefono; 
            this.direccionAcu = acudiente.direccion;
            this.nombreAcu = acudiente.nombre;
            this.generoAcu = acudiente.genero; 
            /**Datos de hora y fecha */
            this.fechaHora = fecha + ' ' + hora;
            this.estadoFecha = estadoFecha;
            /**Campos de procedimiento - modalidad */
            this.cama = proceModalidad.camaUCI.toString();
            this.bancoSangre = proceModalidad.bancoSangre.toString();
            this.idProcedimientoModalidad = proceModalidad.idProcedimientoModalidad.toString();
            this.estadoCama = estadoCama;
            /**Datos de observacion */
            this.observacion = observacion;
            /**Campos salas y usuario*/
            this.idUsuario = idUsuario;
            this.idSala = idSala;
    }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }
}