import * as yup from "yup";

export const validationSchema = yup.object({
    fullName: yup.string().required("Full Name is required!"),
    address1: yup.string().required("Address is required!"),
    address2: yup.string(),
    city: yup.string().required("City is required!"),
    state: yup.string().required("State is required!"),
    zip: yup.string().required("Zipcode is required!"),
    country: yup.string().required("Country is required!"),
})