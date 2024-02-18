import LoadingComponent from "../../app/layout/LoadingComponents";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const sortOptions = [
    {value: "name", label: "A - Z"},
    {value: "priceDesc", label: "Price - High to Low"},
    {value: "priceAsc", label: "Price - Low to High"},
]

export default function Catalog() {

    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, brands, types} = useAppSelector(state => state.catalog);
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
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb: 2}}>
                    <TextField 
                        label="Search Games"
                        variant="outlined"
                        fullWidth
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <RadioGroup>
                            {sortOptions.map(({value, label}) => (
                                <FormControlLabel value={value} control={<Radio />} label={label} key={value}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel control={<Checkbox />} label={brand} key={brand}/>
                        ))}
                        
                    </FormGroup>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel control={<Checkbox />} label={type} key={type}/>
                        ))}
                        
                    </FormGroup>
                </Paper>
            </Grid>

            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        Display 1 - 6 of 20 items
                    </Typography>
                    <Pagination 
                        color="secondary"
                        size="large"
                        count={10}
                        page={2}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}