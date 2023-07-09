import { adminList } from "./constants";

//  it's return YYYY-MM-DD
export const formatAppDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const checkIsAdmin = (data) =>{
    let flag= false;

    adminList.map((admin)=>{
        if(admin.mobile == data){
            flag=true;
        }
    })
    return flag;
}

