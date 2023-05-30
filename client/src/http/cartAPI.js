import {$authHost} from "./index";

export const addToCart = async (id) =>{
    const {data} = await $authHost.post('api/cart/'+id)
    return data
}
export const getCart = async () =>{

    const {data} =await $authHost.get('api/cart')
    return data
}
export const updateOne = async (id)=>{
    await $authHost.patch('api/cart/add/'+id)
}
export const deleteOne = async (id)=>{
    await $authHost.patch('api/cart/reduce/'+id)
}
export const deleteAll = async ()=>{
    await $authHost.delete('api/cart')
}
export const deleteItem = async (id)=>{
    await $authHost.delete('api/cart/'+id)
}