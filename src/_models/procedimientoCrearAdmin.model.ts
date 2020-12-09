import { DocumentoRequerido } from './documento.model';
import { MaterialRequerido } from './material.model';
import { especialidadesPrevisualizar } from './modelEspecialista/especialidad.model';
import { InstrumentosEquipos } from './modelInstrumento/instrumentos-equipos.model';

export class CrearProcedimientoAdmin{
    /**
     * Identificador del objeto procedimiento
     */
    public codigoProcedimiento : string;
    /**
     * Nombre del procedimiento
     */
    public nombre : string;
    /**
     * Tipo del procedimiento
     */
    public tipo : string;

    public idModalidad:number;

    public camaUCI:Boolean;

    public bancoSangre:Boolean;

    public documentacionRequerida:DocumentoRequerido[];

    public materialesRequeridos: MaterialRequerido[];

    public equiposRequeridos: InstrumentosEquipos[];

    public especialidadesRequeridas: especialidadesPrevisualizar[];

    constructor(){  }

}