import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

// Helper function for Axios. Getting response.data and storing it in responseBody.
const responseBody = (response: AxiosResponse) => response.data;

// Add an object for different types of requests.
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

// Another object that is going to store requests for the catalog.
const Catalog = {
    list: () => requests.get("products"),
    details: (id: number) => requests.get(`products/${id}`)
}


const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorized"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error")
}

// Another object that exports Catalog.
const agent = {
    Catalog,
    TestErrors
}

export default agent;
