import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="sticky" sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h6">
                    Everything Gaming
                </Typography>
            </Toolbar>
        </AppBar>
    )
}