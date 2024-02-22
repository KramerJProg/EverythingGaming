import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

// FOR TESTING PURPOSES FOR LOADER, REMOVE BEFORE PRODUCTION.
const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

// Helper function for Axios. Getting response.data and storing it in responseBody.
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

// Axios Interceptor to prevent Uncaught exceptions.
axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
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
    // Added URLSearchParams (interface) here to allow to pass up the params to the request.
    // axios.get can be passed up as a type of object, here it will be of type: URLSearchParams. 
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

// Another object that is going to store requests for the catalog.
const Catalog = {
    list: (params: URLSearchParams) => requests.get("products", params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get("products/filters")
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

// Create new object to store our requests to go up to the AccountController.
// get request for the current user since using the JWT.
const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser")
}

// Another object that exports objects from agent.tsx.
const agent = {
    Catalog,
    TestErrors,
    Cart,
    Account
}

export default agent;
