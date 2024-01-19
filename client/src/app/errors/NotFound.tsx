import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
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