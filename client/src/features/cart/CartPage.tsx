import { Button, Grid, Typography } from "@mui/material";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import CartTable from "./CartTable";

export default function CartPage() {
    // Using StoreContext (React Context)
    // const {cart, setCart, removeItem} = useStoreContext();

    //Using Redux
    const {cart} = useAppSelector(state => state.cart);


    if (!cart) return <Typography variant="h3" textAlign={"center"}>Your Cart Is Empty!</Typography>

    return (

        <>
            <CartTable items={cart.items} />
            <Grid container>
            <Grid item xs={6} />
                <Grid item xs={6}>
                    <CartSummary />
                    <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
        
    )
}