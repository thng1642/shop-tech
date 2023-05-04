export interface Item {
    id: string, 
    img: string,
    price: string,
    quantity: number,
    total: string,
    name: string,
}
export interface UpdateItem {
    id: string,
    quantity: number,
}