export class Sala{
    /**
     * id del objeto sala
     */
    public idSala:number;
    /**
     * nombre de la sala
     */
    public nombre:string;
    /**
     * lugar de ubicacion de la sala
     */
    public lugar:string;

    constructor(){}

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Sala{
        if(json==null){return null;}
        var sala = new Sala();

        sala.idSala = json.idSala;
        sala.nombre = json.nombre;
        sala.lugar = json.lugar;

        return sala;
    }
}