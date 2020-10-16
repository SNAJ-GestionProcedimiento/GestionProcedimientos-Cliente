export class TipoId{
    /**
     * clave de tipo de indentificación
     */
    public id:string;
    /**
     * nombre de tipo de indentificación
     */
    public nombre:string;

    constructor(id:string,nombre:string){
        this.id = id;
        this.nombre = nombre;
    }

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Array<TipoId>{
        if(json.tiposID.length == 0){return null;}
        var colTipos = new Array<TipoId>();
        
        json.tiposID.forEach(element => {
            var tipoDoc = new TipoId(element[0],element[1]);
            colTipos.push(tipoDoc);
        });

        return colTipos;
    }
}