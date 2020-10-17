export class DateHelper{
    public static dateToStr(date:Date){
        let oldDate = date;
        console.log(oldDate);
        let year = oldDate.getFullYear().toString();
        let month = oldDate.getMonth().toString().length<2?'0'+oldDate.getMonth().toString():oldDate.getMonth().toString();
        let day = oldDate.getDate().toString().length<2?'0'+oldDate.getDate().toString():oldDate.getDate().toString();
        let strDate = year+'-'+month+'-'+day;
        return strDate;
    }

    public static getAge(birthdate:Date){
        let currentDate = new Date();
        let age = currentDate.getFullYear() - birthdate.getFullYear();
        let month = currentDate.getMonth() - birthdate.getMonth();
        if(month < 0 || (month===0 && currentDate.getDate() < birthdate.getDate())){
            age--;
        }
        return age;
    }
}