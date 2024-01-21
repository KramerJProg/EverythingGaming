import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

// FOR TESTING PURPOSES FOR LOADER, REMOVE BEFORE PRODUCTION.
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

// Helper function for Axios. Getting response.data and storing it in responseBody.
const responseBody = (response: AxiosResponse) => response.data;

// Axios Interceptor to prevent Uncaught exceptions.
axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {

    const {data, status} = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate("/server-error", {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

// Add an object for different types of requests.
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

// Another object that is going to store requests for the catalog.
const Catalog = {
    list: () => requests.get("products"),
    details: (id: number) => requests.get(`products/${id}`)
}

// Error Routes
const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorized"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error")
}

// Allows for items to be added or removed in storage in regards to cart ID.
const Cart = {
    get: () => requests.get("cart"),
    addItem: (productId: number, quantity = 1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
}

// Another object that exports objects from agent.tsx.
const agent = {
    Catalog,
    TestErrors,
    Cart
}

export default agent;
