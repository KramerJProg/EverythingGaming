import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../app/models/cart";

interface CartState {
    cart: Cart | null
}

const initialState: CartState = {
    cart: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.cart?.items.findIndex(i => i.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.cart!.items[itemIndex].quantity -= quantity;
            if (state.cart?.items[itemIndex].quantity === 0) state.cart.items.splice(itemIndex, 1);
        }
    }
})

export const {setCart, removeItem} = cartSlice.actions;