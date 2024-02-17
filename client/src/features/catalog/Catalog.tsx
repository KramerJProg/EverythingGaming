import LoadingComponent from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";



export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    // using Axios from agent.
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    // another useEffect to avoid getting the products Twice from
    // from the API. If fetchFilters was in the above useEffect,
    // It would retrieve the products from the API, then fetch-
    // Filters, THEN retrieve the Products from the API once again.
    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading Games..."/>

    return (
        <>
            <ProductList products={products} />
        </>
        
    )
}