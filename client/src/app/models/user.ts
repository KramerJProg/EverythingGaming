import { Cart } from "./cart";

export interface User {
    email: string;
    token: string;
    cart?: Cart;
}