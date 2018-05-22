export function IsObjectEmpty(obj){

    let isEmptyObject = true;

    if(obj instanceof Object){

        isEmptyObject = Object.keys(obj).length == 0;

    }


    return  isEmptyObject;
}

export function SafeCopy(obj){

    return JSON.parse(JSON.stringify(obj));

}