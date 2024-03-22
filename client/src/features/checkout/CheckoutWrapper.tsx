import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setCart } from "../cart/cartSlice";
import LoadingComponent from "../../app/layout/LoadingComponents";

const stripePromise = loadStripe("pk_test_51OvyyyLfB7ekKJSqQe9hDHDh6t9ohLAhpT9mYK8yoM31FkWbCt4BBrnJ9ohL5E5NJ5kVdOqDN6XbCt6UFrddp1QH00BQfU8Sa2")

export default function CheckoutWrapper() {

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch]);

    if (loading) return <LoadingComponent message="Loading Checkout..." />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}