export class Modalidad{
    /**
     * Identificador del objeto modalidad
     */
    idModalidad:string;
    /**
     * Nombre de la modalidad
     */
    nombre:string;

    constructor(){}

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Modalidad{
        if(json==null){ return null}
        var modalidad = new Modalidad;

        modalidad.idModalidad = json.idModalidad;
        modalidad.nombre = json.nombre;

        return modalidad;
    }
}