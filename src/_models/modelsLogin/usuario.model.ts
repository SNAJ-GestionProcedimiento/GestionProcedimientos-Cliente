export class Usuario{
    public username:string = "lc"; 
    public password:string = "lc"; 
    public first_name:string = "l";
    public last_name:string = "c";
    public email:string = "lcruiz@unicauca.edu.co";
    public groups:string[] = [];

    public parseToJSON():JSON{
        return JSON.parse(JSON.stringify(this));
    }

    public static fromJSON(json):Usuario{
        if(json==null){return null;}
        var usuario = new Usuario();

        usuario.username = json.username ;
        usuario.password = json.password;
        usuario.first_name = json.first_name ;
        usuario.last_name = json.last_name ;
        usuario.email = json.email;
        usuario.groups = json.groups;
        
        return usuario
    }
}