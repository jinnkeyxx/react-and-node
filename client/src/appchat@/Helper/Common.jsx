export const isEmptyObj = (obj) => {
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            return false
        }
    }
    return true
}
