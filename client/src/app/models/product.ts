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

// Stores the product parameters.
export interface ProductParams {
    orderBy: string;
    // following 3 are optional because the filters don't need to be sent up
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}