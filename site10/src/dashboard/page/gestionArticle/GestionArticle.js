import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
export default function GestionArticle() {
  // State for managing the existing articles
  const [rows, setRows] = React.useState([]);

  // State for managing the edit modal
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [editedArticle, setEditedArticle] = React.useState(null);

  // State for managing the new article form
  const [newArticle, setNewArticle] = React.useState({
    nom: '',
    message: '',
    date: '',
    position: '',
  });

  // Function to handle article deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/api/article/${id}`);
      const response = await axios.get('http://localhost:9090/api/article/all');
      setRows(response.data);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  // Function to handle article edit
  const handleEdit = (id) => {
    const articleToEdit = rows.find((article) => article.id === id);
    setEditedArticle(articleToEdit);
    setOpenEditModal(true);
  };

  // Function to handle saving the edited article
  const handleSaveEdit = async () => {
    try {
      // Implement your logic to update the article in the database
      // Use editedArticle data for updating
      // ...

      setOpenEditModal(false);
      const response = await axios.get('http://localhost:9090/api/article/all');
      setRows(response.data);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // Function to handle adding a new article
  const handleAddNewArticle = async () => {
    try {
      // Implement your logic to add a new article to the database
      await axios.post('http://localhost:9090/api/article', newArticle);

      // After adding, refetch the data to update the UI
      const response = await axios.get('http://localhost:9090/api/article/all');
      setRows(response.data);

      // Clear the form after adding
      setNewArticle({
        nom: '',
        message: '',
        date: '',
        position: '',
      });
    } catch (error) {
      console.error('Error adding new article:', error);
    }
  };

  // Columns configuration for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'nom', headerName: 'Nom', width: 100, align: 'center', editable: true },
    { field: 'message', headerName: 'Message', width: 200, align: 'center', editable: true },
    { field: 'date', headerName: 'Date', width: 100, align: 'center', editable: true },
    { field: 'position', headerName: 'Position', width: 200, align: 'center', editable: true },
    {
      field: 'imageBon',
      headerName: 'Image',
      width: 140,
      align: 'center',
      editable: false,
      renderCell: (params) => (
        <img
        style={{
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          marginRight: '10px',
          margin: '10px',
        }}
          src={`data:image/jpeg;base64,${params.value}`}
          alt="Image du produit"
          
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      textAlign: 'center',
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           
          <strong>
            <button
              style={{ width: 80, borderRadius: 20, textAlign: 'center',color:"red" }}
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlinedIcon/>
            </button>
            
          </strong>
          <strong>
            <button
              style={{ width: 80, borderRadius: 20, textAlign: 'center',color:"blue" }}
              onClick={() => handleDelete(params.row.id)}
            >
             <CreateOutlinedIcon/>
            </button>
            
          </strong>
        </div>
      ),
    },
  ];

  // Fetch the initial data on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/article/all');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ height: '560px', width: '100%', mx: 'auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />

      

       
    </Box>
  );
}
