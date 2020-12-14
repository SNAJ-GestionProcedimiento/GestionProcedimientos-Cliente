export class AuthHelper{
    /**
     * Cambia el usuario que haya iniciado sesion
     * @param res Respuesta del servidor al iniciar sesión
     */
    public static setLoggedToken(res, userGroup):void{
        localStorage.setItem('token',res.token);
        localStorage.setItem('group',userGroup.group_name);
        localStorage.setItem('username',userGroup.username);
    }
    /**
     * Obtiene el usuario de la sesión actual
     */
    public static getLoggedToken(){
        let token = localStorage.getItem('token');
        if(token==null){return null;}
        return token;
    }
    /**
     * Obtiene el el grupo (rol) de la sesión actual
     */
    public static getUserGroup(){
        let grupo = localStorage.getItem('group');
        if (grupo == null){return null;}
        return grupo;
    }
    /**
     * Cierra la sesión actual
     */
    public static logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('group');
        localStorage.removeItem('username');
    }
}