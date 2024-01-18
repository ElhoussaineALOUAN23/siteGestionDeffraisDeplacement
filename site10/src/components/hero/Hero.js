import { AccessAlarmOutlined, CreditScoreOutlined, ElectricBolt, WorkspacePremiumOutlined } from "@mui/icons-material";
 
import {Box, Container,Divider,  Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { grey } from "@mui/material/colors";
 

const Hero = ()=>{
    return(
        <div  >
        <Container  >
        <Stack
    divider={true ? <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border)' }} /> : null}
    sx={{ flexWrap: "wrap", flexDirection: "row", alignItems: "center" }}
>
             <MyBox 
             icon={<ElectricBolt/>} 
             title={"Fast Delivery"}
             subTitle={"Start from 10"}
              />
             <MyBox 
             icon={<WorkspacePremiumOutlined/>}
             title={"Money Guarantee"} 
             subTitle={"7 Days Back"}
             />
             <MyBox 
             icon={<AccessAlarmOutlined/>}
              title={"365 Days"} 
              subTitle={"For free return"}
              />
             <MyBox 
             icon={<CreditScoreOutlined/>}
              title={"Payment(Cart bqr)"} 
              subTitle={"Secure system"} 
              />
         </Stack>
        </Container>
        </div>
    )
}
export default Hero;

const MyBox = ({icon,title,subTitle})=>{
    return(
        
            <Box   
            sx={{
                width: 200,
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: 3,
                justifyContent: "center",
                py: 1.6,
                color: 'var(--blue)',
                fontSize: 18,  
              }} >
                 {icon}
            <Box>
            <Typography variant="body1" sx={{fontWeight:600,color: 'var(--title)' }}>{title}</Typography>
            <Typography 
             sx={{ fontWeight: 300, color: grey[600]}}
             variant="body1"
             >
             {subTitle}
            </Typography>
            </Box>
            </Box>     
          
    )
}
 