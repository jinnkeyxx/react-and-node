import aixos from 'axios'
import { url } from './url'

export const getData = async ( product ) => {
    const urlApi = `${url}/?product=${product}`
    const response = await aixos.get(urlApi)
    const data = await response.status === 200 ? response.data : []
    return data
}

export const PaginationData = ( data , page , limit) => {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const result = data.slice(startIndex , endIndex)
    return result
}