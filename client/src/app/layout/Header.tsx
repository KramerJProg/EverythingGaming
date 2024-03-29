import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

// Routes for other page components.
const pageLinks = [
    {title: "catalog", path: "/catalog"},
    {title: "contact", path: "/contact"}
]

// Routes for Login and Registration.
const loginLinks = [
    {title: "login", path: "/login"},
    {title: "register", path: "/register"}
]

// Applies to all styling in the Nav Bar.
const navStyles = {
    color: "inherit", 
    textDecoration: "none",
    "&:hover": {
        color: "grey.500"
    },
    "&.active": {
        color: "text.secondary"
    }
}

// For the font size of the nav items.
const navStyleFontSizeNavItems = {
    typography: "body2",
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({darkMode, handleThemeChange}: Props) {

    // Redux State
    const {cart} = useAppSelector(state => state.cart);
    const {user} = useAppSelector(state => state.account);

    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="sticky">
            <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>

                <Box display="flex" alignItems="center">

                    {/* Title of Application link which navs to Home Page. */}
                    <Typography variant="h6"
                    align="left"
                    color="grey.700"
                    sx={{
                        backgroundcolor: "primary",
                        backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
                        backgroundSize: "100%",
                        backgroundRepeat: "repeat",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                    component={NavLink} to="/">
                        Everything Gaming
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <Box display="flex" alignItems="center" sx={navStyleFontSizeNavItems}>

                    {/* Catalog, About, and Contact Pages. */}
                    <List sx={{display: "flex"}}>
                        {pageLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    {/* Shopping Cart Icon. */}
                    <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit" sx={{mr: 2, ml: 2}}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    
                    {/* If the user is logged in, display greeting user, else display nav list. */}
                    {user ? (
                        <Typography>
                            Signed in as <SignedInMenu />
                        </Typography>
                    ) : (
                        <List sx={{display: "flex"}}>
                            {loginLinks.map(({title, path}) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}