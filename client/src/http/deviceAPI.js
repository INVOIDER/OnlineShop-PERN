import {$authHost,$host} from "./index";
import jwt_decode from  "jwt-decode";
export const createType = async (type) =>{
    const {data} =await $authHost.post('api/type',type)
    return data
}
export const getTypes = async () =>{
    const {data} =await $host.get('api/type')
    return data
}



export const createBrand = async (brand) =>{
    const {data} =await $authHost.post('api/brand',brand)
    return data
}
export const getBrands = async () =>{
    const {data} =await $host.get('api/brand')
    return data
}
export const createDevice = async (device) =>{
    const {data} =await $authHost.post('api/device',device)
    return data
}
export const getDevices = async (typeID, brandID,page,limit=5) =>{
    const {data} =await $host.get('api/device',{params:{
            typeID,brandID,page,limit
        }})
    return data
}
export const getOneDevice = async (id) =>{
    const {data} =await $host.get('api/device/' + id)
    return data
}
export const check = async () =>{
    const {data} =await $host.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}