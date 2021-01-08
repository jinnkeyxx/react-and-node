import axios from 'axios'
import { url } from './Url'
import jwt from 'jsonwebtoken'
const KEY_JWT = "appchat@"
export const sendPostData = async (path , data) => {
    let result
    const response = await axios({
        url : `${url}/${path}`,
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'JWT fefege'
        },
        data : data
    }).then((e) => {
        result = e
    }).catch((e) => {
        result = e
    })
    return result.data
}

export const saveToken = (token) => {
    if(token !== undefined && token !== null && token !== ""){
        localStorage.setItem('token' , JSON.stringify(token))
    }
}
export const isLogin = () => {
    const user = getToken()
    if(user !== undefined && user !== null && user !== ""){
        return true
    }
    return false
}
export const removeToken = () =>{
    localStorage.removeItem('token')
}
export const getToken = () => {
   return localStorage.getItem('token')
}
export const decodeToke = () => {
    const token = getToken()
    let decode = null
    if(token !== undefined && token !== null && token !== ""){
        decode = jwt.verify(JSON.parse(token) , KEY_JWT)
    }
    return decode
}
export const getUsername = () => {
    const infoUser = decodeToke()
    let username = null
    if(infoUser !== null){
        username = infoUser.username
    }
    return username
}
export const  getRole = () => {
    const infoUser = decodeToke()
    let role = null
    if(infoUser !== null){
        role = infoUser.role
    }
    return role
}
