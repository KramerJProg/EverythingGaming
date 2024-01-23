import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface StoreContextValue {
    cart: Cart | null;
    setCart: (cart: Cart) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// In order to consume the store context, create custom React Hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error("Oops! - We don't seem to be in the provider!");
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<unknown>) {
    const [cart, setCart] = useState<Cart | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!cart) return;
        const items = [...cart.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setCart(prevState => {
                return {...prevState!, items}
            })
        }
    }

    // Made StoreProvider usable thoughout the entire application ---> index.tsx
    return (
        <StoreContext.Provider value={{cart, setCart, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}