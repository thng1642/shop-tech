import axios from "axios"


/**
 * API gets relative products
 * @param id category id
 * @returns 
 */
export function getRelativeProduct(id:string) {
    const baseUrl = `http://localhost:5000/api/v1/relative/product/${id}`

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

            const result : any[] = responsive.data
            return [result, null]
        }
    ).catch(error => {
        return [null, error.response]
    })
}