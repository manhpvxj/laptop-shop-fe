
import React from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { Typography, Box,Container} from '@mui/material';



const Footer = () => {
return (
	<Box className="mt-20 border-t-2 border-slate-300 bg-gray-100 py-6">
        <Typography
        className="text"
        color="black"
        marginTop="-10px"
        textAlign="center"
        variant="h5"
        >
            Laptop MT
        </Typography>

	    <Container>
            <Box display="inline-block" textAlign="left" width="50%" >
                
                <Typography
                variant="h6"
                >
                    Contact us :
                </Typography>

                <Box display="flex" marginTop="2px">
                <HomeIcon fontSize="small" color="info"/>
                <Typography
                marginLeft="5px"
                color="info"
                >
                    64MHT2 - HUCE
                </Typography>
                </Box>

                <Box display="flex" marginTop="2px">
                <PhoneIcon fontSize="small" color="info"/>
                <Typography
                marginLeft="5px"
                color="info"
                >
                    Tel 1 : 0838110501
                </Typography>
                </Box>

                <Box display="flex" marginTop="2px">
                <PhoneIcon fontSize="small" color="info"/>
                <Typography
                marginLeft="5px"
                color="info"
                >
                Tel 2 : 0961342548
                </Typography>
                </Box>

                <Box display="flex" marginTop="2px">
                <DesignServicesIcon fontSize="small" color="info" />
                <Typography
                marginLeft="5px"
                color="info"
                >
                    Designed by : Minh Tráng, Phạm Mạnh
                </Typography>
                </Box>

            </Box>
            <Box display="inline-block"  textAlign="end" width="50%" >
                <Box >
                {/* <a href="https://www.facebook.com/trang110501" className="mr-2.5">
                Minh Tráng
                </a> */}
                <Link href="https://www.facebook.com/trang110501" color="inherit" underline="none" marginRight="7px" >
                Minh Tráng
                </Link>
                <FacebookIcon fontSize="small" color="info"/> 
                </Box>

                <Box>
                <Link href="https://www.facebook.com/ImNotYuuki" color="inherit" underline="none" marginRight="7px" >
                Phạm Mạnh
                </Link>

                <FacebookIcon fontSize="small" color="info"/> 
                </Box>

                <Box>
                <Link href="https://github.com/manhpvxj" color="inherit" underline="none" marginRight="7px" >
                Phạm Mạnh
                </Link>
                <GitHubIcon fontSize="small" color="info"/> 
                </Box>


            </Box>



        </Container>
	</Box>
);
};
export default Footer;