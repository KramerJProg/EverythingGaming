import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    return (
        <>
            <Slider {...settings} arrows={false}>
                <div>
                    <img src="/images/MainPic.jpg" alt="" style={{display: "block", width: "100%", maxHeight: 700}}/>
                </div>
                <div>
                    <img src="/images/RZR.jpg" alt="" style={{display: "block", width: "100%", maxHeight: 700}}/>
                </div>
                <div>
                    <img src="/images/PC.jpg" alt="" style={{display: "block", width: "100%", maxHeight: 700}}/>
                </div>
                <div>
                    <img src="/images/Switch.jpg" alt="" style={{display: "block", width: "100%", maxHeight: 700}}/>
                </div>
            </Slider>
            <Box display="flex" justifyContent="center" sx={{p: 4}}>
                <Typography
                    variant="h1"
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
                    >
                    EVERYTHING GAMING
                </Typography> 
            </Box>
        </>
    )
}