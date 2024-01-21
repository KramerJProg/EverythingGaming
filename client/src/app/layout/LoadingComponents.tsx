import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";


interface Props {
    message?: string;
}

export default function LoadingComponent({message = "Loading..."}: Props) {
    // Implemented Loading component in case of a slow connection
    // to let the user know something is happening instead of a
    // blank screen.
    return (
        <Backdrop open={true} invisible={true}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={100} color="primary"/>
                <Typography variant="h4" sx={{justifyContent:"center", position:"fixed", top:"60%"}}>{message}</Typography>
            </Box>
        </Backdrop>
    )
}