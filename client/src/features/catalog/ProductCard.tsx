import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync } from "../cart/cartSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const {status} = useAppSelector(state => state.cart)
    
    // Using React Context
    // const {setCart} = useStoreContext();

    // Redux
    const dispatch = useAppDispatch();

    return (
        // Renders the product 'Card'. These will render the image and price of the product.
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "secondary.main"}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: "bold", color: "primary.main"}
                }}
            />
            <CardMedia
                sx={{ height: 200, backgroundSize: "contain"}}
                image={product.pictureUrl}
                title={product.name}
                component={Link} to={`/catalog/${product.id}`}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={status.includes("pendingAddItem" + product.id)} onClick={() => dispatch(addCartItemAsync({productId: product.id}))} size="small">
                    Add to Cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}