import { useEffect, useState } from "react"
import { Cart } from "../../app/models/cart";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponents";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function CartPage() {
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<Cart | null>(null);

    // To go retrieve the cart.
    useEffect(() => {
        agent.Cart.get()
        .then(cart => setCart(cart))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading Your Cart..."/>

    if (!cart) return <Typography variant="h3">Your Cart Is Empty!</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cart.items.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.name}</TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}