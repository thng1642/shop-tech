import axios from "axios"
import { Product } from "../../model/product"

export function trendingApi() {

    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'

    const header = {
        "Content-Type": 'application/json',
    }

    return axios(
        {
            headers: header,
            url: baseUrl,
            method: "GET"
        }
    ).then(
        responsive => {
            const result = responsive.data
            
            return [result, null]
        }
    ).catch(error => {
        if (error.response) {

            const errorRes = error.response;
        }
        
        return [null, error.response]
    })
}
export function getProductById(id:string) {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'

    const header = {
        "Content-Type": 'application/json',
    }

    return axios(
        {
            headers: header,
            url: baseUrl,
            method: "GET"
        }
    ).then(
        responsive => {

            const result : Product[] = responsive.data

            let product = result.filter( item => JSON.stringify(item._id).includes(id))

            return [product, null]
        }
    ).catch(error => {
        if (error.response) {

            const errorRes = error.response;
        }
        
        return [null, error.response]
    })
}