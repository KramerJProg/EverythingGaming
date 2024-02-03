import { counterSlice } from "../../features/contact/counterSlice";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../../features/cart/cartSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore ({
    reducer: {
        counter: counterSlice.reducer,
        cart: cartSlice.reducer
    }
})

// Custom Hooks for convenience.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;