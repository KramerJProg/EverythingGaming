import LoadingComponent from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
    {value: "name", label: "A - Z"},
    {value: "priceDesc", label: "Price - High to Low"},
    {value: "price", label: "Price - Low to High"},
]

export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog);
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

    if (!filtersLoaded) return <LoadingComponent message="Loading Games..."/>

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup 
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons 
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons 
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>
            </Grid>

            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb: 2, pt: 2}}>
                {metaData &&
                <AppPagination 
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Grid>
        </Grid>
    )
}