import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
export default function ContactsInformation() {
  const [rows, setRows] = React.useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/contact/${id}`);
      // After deletion, refetch the data to update the UI
      const response = await axios.get('http://localhost:9090/api/contact/all');
      setRows(response.data);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align:'center',
      editable: true,

    },
    {
      field: 'message',
      headerName: 'Message',
      width: 500,
      align:'center',
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      textAlign:'center',
      sortable: false,
      renderCell: (params) => (
        <strong>
        <button
          style={{ width: 80, borderRadius: 20, textAlign: 'center',color:"red" }}
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteOutlinedIcon/>
        </button>
        
      </strong>
      ),
    },
  ];

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
    <>
    <Box sx={{ height: '560px', width: '100%', mx: 'auto',mx: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
    </>
  );
}
