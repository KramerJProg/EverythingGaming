
import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CartPage from "../../features/cart/CartPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'checkout', element: <CheckoutPage />},
                {path: 'orders', element: <Orders />},
            ]},
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'cart', element: <CartPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            // If the user finds themselves in any place other than the
            // routes listed above, the * path will automatically redirect
            // them to the '/not-found' end point.
            {path: '*', element: <Navigate replace to={'/not-found'} />}
        ]
    }
])