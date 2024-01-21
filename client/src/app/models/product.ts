export interface Product {
    id: number
    name: string
    description: string
    price: number
    pictureUrl: string
    // type can be optional.
    type?: string
    brand: string
    // quantity in stock can be optional in case default obj is null.
    quantityInStock?: number
}