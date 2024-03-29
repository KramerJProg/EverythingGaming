import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync, removeCartItemAsync } from "../cart/cartSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {

    // Redux State
    const {cart, status} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, +id!));
    const {status: productStatus} = useAppSelector(state => state.catalog);

    const [quantity, setQuantity] = useState(0);
    const item = cart?.items.find(i => i.productId === product?.id);

    // Axios is used from agent.
    useEffect(() => {
        if (item) setQuantity(item.quantity);

        if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, dispatch, product])

    // Making sure the user can't go below 0 quantities.
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0) {
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    // Checks to see if the item exists, if not, it returns, but if the item does exist,
    // then allows for the item to be saved at the amount desired by the user.
    function handleUpdateCart() {
        if (!product) return;
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addCartItemAsync({productId: product?.id, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeCartItemAsync({productId: product?.id, quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes("pending")) return <LoadingComponent message="Loading Game..."/>

    if (!product) return <NotFound />

    // Renders the product and all of its information when retrieved by ID.
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h3" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2} sx={{mt: .5}}>
                    <Grid item xs={2}>
                        <TextField 
                            onChange={handleInputChange} 
                            variant="outlined" 
                            type="number" 
                            label="Quantity in Cart" 
                            fullWidth value={quantity} 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            // The disabled checks if the quantity is the same quantity as
                            // when it was initially set, if so, then it will disable the
                            // button so the user can't save what is already saved. Otherwise,
                            // the user can add or remove as long as it is not the same prior
                            // to the save state.
                            disabled={item?.quantity === quantity || !item && quantity === 0}
                            loading={status.includes("pending")} 
                            onClick={handleUpdateCart} 
                            sx={{height: "55px"}} 
                            color="primary" 
                            size="large" 
                            variant="contained" 
                            fullWidth>
                            {item ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={2}>
                        <Button 
                            variant="contained" 
                            sx={{height: "55px"}} 
                            color="primary" 
                            size="large"
                            href="/catalog" > Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}