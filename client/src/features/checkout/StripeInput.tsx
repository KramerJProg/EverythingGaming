
import { InputBaseComponentProps } from "@mui/material";
import { Ref, forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps {}

// Only purpose for writing all this extra code is to maintain the Material UI style.
// If I only used the Stripe code snippet with the CardElement, it would look different.
export const StripeInput = forwardRef(function StripeInput({component: Component, ...props}: Props, ref: Ref<unknown>) {
    const elementRef = useRef<any>();

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current.focus
    }));

    return (
        <Component 
            onReady={(element: any) => elementRef.current = element} options={{style: {base: {color: "#56ae57"}}}}
            {...props}
        />
    )
})