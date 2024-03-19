import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51OvyyyLfB7ekKJSqQe9hDHDh6t9ohLAhpT9mYK8yoM31FkWbCt4BBrnJ9ohL5E5NJ5kVdOqDN6XbCt6UFrddp1QH00BQfU8Sa2")

export default function CheckoutWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}