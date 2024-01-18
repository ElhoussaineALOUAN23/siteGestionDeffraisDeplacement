
import{ Box, Paper, Stack, Typography  } from "@mui/material";
import React from 'react'
import Line from "../lineChart/Line";
import { useTheme } from "@emotion/react";
import Pie from "../pieChart/Pie";
import axios from "axios";
 
 const Row3=()=> {
  const theme=useTheme()
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/contact/all');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    
     <Stack direction={"row"} mt={3} gap={2} >
       
      <Paper sx={{flexGrow:1,minWidth:"300px" , width:"20%" }}  className="border"   >
      <Typography  color={theme.palette.secondary.main} fontWeight={"bold"}p={1.2} variant="h6">Line Chart</Typography>
      <Line isDahboard={true} />
      </Paper>
       

      <Paper sx={{ flexGrow:1,minWidth:"300px"  ,width:"10%"}} className="border" >
      <Typography    color={theme.palette.secondary.main} fontWeight={"bold"}p={1.2} variant="h6">Statistique Etats</Typography>
        <Pie isDahboard={true} />
      </Paper>

      <Paper sx={{flexGrow:1,minWidth:"300px"  ,width:"10%"}} className="border">
      <Box  sx={{overflow:"auto",maxWidth:900 ,maxHeight:600 , flexGrow:1 }} ><Paper ><Typography color={theme.palette.secondary.main} fontWeight={"bold"}p={1.2} variant="h6">Grstion Contacts</Typography></Paper>
    <Paper sx={{
      mt:1,
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
    }}>
     <Box p={1.2}>
     {rows.map((item) => (
        <div key={item.id}   style={{margin:2,border:"2px solid var(--border)"}}>
      <Typography variant="body1" frontWeight="600" sx={{color:"var(--blue)"}} >
      {item.email}
      </Typography>
       
      <Typography variant="body1" frontWeight="600" >
      {item.message}
      </Typography>
       
       </div>
      ))}
     </Box>
    </Paper>
    </Box> 
      </Paper>
     </Stack>
  );
}
export default Row3;