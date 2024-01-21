import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    // In case the user navigates to somewhere non-existant,
    // It will bring them to a custom error page and give 
    // them the option to return to the store.
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant="h3">
                Oops! - We could not find what you were looking for!
            </Typography>
            <Divider />
            <Typography component={Link} to={"/catalog"}>
                <Button fullWidth>Go Back To Shop!</Button>
            </Typography>
        </Container>
    )
}