import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ContactPage() {

    return (
        <>
            <Typography variant="h4" textAlign={"center"}>
                Contact Me!
            </Typography>
            <Divider />
            <Grid container justifyContent="center">
                <Grid item>
                <Tooltip title="Kramer's Email" placement="left">
                    <Typography sx={{mt: 4}}>
                        Kramerdjensen@gmail.com
                    </Typography>
                </Tooltip>
                <Tooltip title="Kramer's LinkedIn" placement="left">
                    <Typography sx={{mt: 4}}>
                        <Link target="_blank" to="https://www.linkedin.com/in/kramer-jensen-9417b8217/" style={{textDecoration: "none", color: "white"}}>
                            LinkedIn
                        </Link>
                    </Typography>
                </Tooltip>
                <Tooltip title="Kramer's Github" placement="left">
                    <Typography sx={{mt: 4}}>
                        <Link target="_blank" to="https://github.com/KramerJProg" style={{textDecoration: "none", color: "white"}}>
                            Github
                        </Link>
                    </Typography>
                </Tooltip>
                </Grid>
            </Grid>
        </>
        
    )
}