import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

export default function DemmandeList() {
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const [actionDemandes, setActionDemandes] = useState({});
    const [demmandes, setDemmandes] = useState([]);

    useEffect(() => {
        const fetchuDemande = async () => {
        axios.get("http://localhost:9090/api/demmandes")
            .then((response) => {
                setDemmandes(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des demandes:', error);
            });
        };
        fetchuDemande();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this demand?")) {
            axios.delete(`http://localhost:9090/api/demmandes/deletByid/${id}`)
                .then(() => {
                    setDemmandes(prevDemmandes => prevDemmandes.filter(demmande => demmande.id !== id));
                })
                .catch((error) => {
                    console.error('Erreur lors de la suppression de la demande:', error);
                });
        }
    };

    const handleConfirmOrRejectDemmande = async (id, action) => {
      const newStatus = action === 'confirm' ? 'Confirmed' : 'Rejected';
      const userMessage = action === 'confirm' ? 'Votre demande a été confirmée.' : 'Votre demande a été rejetée.';
  
      try {
          const response = await axios.put(`http://localhost:9090/api/mains/${id}/etat?nouvelEtat=${newStatus}&nouvelMsj=${userMessage}`, {
              etat: newStatus,
              msj: userMessage
          });
  
          setActionDemandes(prev => ({ ...prev, [id]: action }));
          setDemmandes(prevDemmandes => prevDemmandes.map(demmande => {
              if (demmande.id === id) {
                  return { ...demmande, etat: newStatus, msj: userMessage };
              }
              return demmande;
          }));
  
      } catch (error) {
          console.error('Erreur lors de la mise à jour de la demande:', error);
          alert('Erreur lors de la mise à jour de la demande.');
      }
  };
  

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'cin', headerName: 'CIN', width: 80, align: 'center', editable: true },
        { field: 'email', headerName: 'Email', width: 160, align: 'center', editable: true },
        { field: 'type', headerName: 'Type', width: 70, align: 'center', editable: true },
        { field: 'montant', headerName: 'Montant', width: 70, align: 'center', editable: true },
        { field: 'etat', headerName: 'Etat', width: 90, align: 'center', editable: true },
        { field: 'date', headerName: 'Date', width: 70, align: 'center', editable: true },
        { field: 'description', headerName: 'Description', width: 160, align: 'center', editable: true },
        { field: 'msj', headerName: 'Msj', width: 160, align: 'center', editable: true },
        {
            field: 'imageBon',
            headerName: 'Image',
            width: 140,
            align: 'center',
            editable: false,
            renderCell: (params) => (
                <img
                    src={`data:image/jpeg;base64,${params.value}`}
                    alt="Image du produit"
                    style={{ height: '50px', width: 'auto' }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 290,
            renderCell: (params) => (
                <div>
                    <Button               
                        startIcon={<DeleteIcon />}            
                        onClick={() => handleDelete(params.row.id)}               
                    >                       
                    </Button>
                    {params.row.etat !== 'Confirmed' && (
                        <Button
                            type="button"
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<DoneIcon />}
                            onClick={() => handleConfirmOrRejectDemmande(params.row.id, 'confirm')}
                            style={{ marginRight: '5px' }}
                        >
                            Confirm
                        </Button>
                    )}
                    {params.row.etat !== 'Rejected' && (
                        <Button
                            type="button"
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<BlockIcon />}
                            onClick={() => handleConfirmOrRejectDemmande(params.row.id, 'reject')}
                        >
                            Reject
                        </Button>
                    )}
                </div>
            ),
        },
        
    ];

    const offset = pageNumber * itemsPerPage;
    const currentPageItems = demmandes.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(demmandes.length / itemsPerPage);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={demmandes}
                columns={columns}
                pageSize={itemsPerPage}
                rowCount={demmandes.length}
                onPageChange={(newPage) => setPageNumber(newPage)}
                pagination
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </Box>
    );
}