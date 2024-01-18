
import{ Box, Paper,Stack, Typography  } from "@mui/material";
import React from 'react'
import Bar from "../barChart/Bar";
import { useTheme } from "@emotion/react";
import axios from "axios";
 
 const Row2=()=> {
  const theme=useTheme()
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/demmandes');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
    <Paper  className="border" sx={{maxWidth:900 ,flexGrow:1}}><Bar isDahboard={true} /></Paper> 
    <Box className="border" sx={{overflow:"auto",maxWidth:900 ,maxHeight:350 , flexGrow:1 }} ><Paper><Typography color={theme.palette.secondary.main} fontWeight={"bold"}p={1.2} variant="h6">Gestion Demande</Typography></Paper>
    <Paper sx={{
      mt:1,
      display:"flex",
      justifyContent:"space-between",
      alignItems:"center",
    }}>
     <Box p={1.2}>
     {rows.map((item) => (
        <div key={item.id} className='flex' style={{margin:2,border:"2px solid var(--border)"}}>
      <Typography variant="body1" style={{marginRight:"20px"}}  >
      {item.nom}
      </Typography>
       
      <Typography variant="body1"   >
      {item.type}
      </Typography>
      <Typography
      style={{marginRight:"0%"}} 
      borderRadius={1.4} 
      p={1} 
      bgcolor={theme.palette.error.main}
       variant="body2">{item.montant} DH</Typography>
       </div>
      ))}
     </Box>
    </Paper>
    </Box> 
  </Stack >
  );
}
export default Row2;