import React, { useState, useEffect } from 'react';
import { Box, Modal } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { MdLocationOn, MdLocationOff } from 'react-icons/md';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ITEMS_PER_PAGE = 3;

const Line = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/article/all?populate=*');
        const articles = response.data.map(article => ({
          ...article,
          position: JSON.parse(article.position.replace(/[\r\n]+/g, '')),
        }));
        setRows(articles);
      } catch (error) {
        console.error('Error fetching article data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRows = rows.slice(startIndex, endIndex);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ height: '75vh', width: '155vh' }}>
      <h1 className="title" style={{ marginBottom: '30px' }}>
        <span className="icon-envelope"> </span>
        Articles
      </h1>

      {currentRows.map(item => (
        <div key={item.id} className="flex">
          <li
            key={item.id}
            style={{
              marginBottom: 12,
              borderRadius: 12,
              border: '1px solid var(--blue)',
              width: '100%',
              height: '150px',
              position: 'relative',
            }}
          >
            <div className="flex min-w-0 gap-x-4">
              <article key={item.imageBon}>
                <img
                  style={{
                    borderRadius: '50%',
                    width: '90px',
                    height: '90px',
                    marginRight: '10px',
                    margin: '10px',
                  }}
                  src={`data:image/jpeg;base64, ${item.imageBon}`}
                  alt={`Product ${item.nom}`}
                />
              </article>
              <div className="min-w-0 flex-auto">
                <h2 style={{ color: 'var(--title)' }}>{item.nom}</h2>
                <p style={{ color: 'var(--blue)' }}>
                  Date de ce Travail est : {new Date(item.date).toLocaleDateString()}
                </p>
                <p style={{ color: 'var(--subtitle)' }}>{item.message}</p>
              </div>
            </div>
            <button
              style={{
                marginLeft: '20px',
                fontSize: '26px',
                position: 'absolute',
                top: 10,
                right: 10,
              }}
              onClick={() => {
                setSelectedArticle(prev => (prev === item.id ? null : item.id));
                openModal();
              }}
            >
              {selectedArticle === item.id ? <MdLocationOff /> : <MdLocationOn />}
            </button>
          </li>
        </div>
      ))}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(244 244 245)',
            borderRadius: '10px',
            boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            width: '80%',
            height: '80%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'row'
          }
        }}
      >
        {/* Content for the modal goes here */}
         <div> {selectedArticle && (
        <div key={selectedArticle} >
          <div  >
          <MapContainer
  center={rows.find(article => article.id === selectedArticle)?.position}
  zoom={30}
  scrollWheelZoom={false}
  className='border'
  style={{
    borderRadius: 12,
    border: '1px solid var(--blue)',
    width: '60%',
    height: '400px',
    margin: 'auto', // Add this line
    position: 'absolute', // Add this line
    top: 0, // Add this line
    bottom: 0, // Add this line
    left: 0, // Add this line
    right: 0, // Add this line
  }}
>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
              <Marker position={rows.find(article => article.id === selectedArticle)?.position}>
                <Popup>
                  A marker with a position icon at Lat:{' '}
                  {rows.find(article => article.id === selectedArticle)?.position[0]}, Lng:{' '}
                  {rows.find(article => article.id === selectedArticle)?.position[1]}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}</div>
      </Modal>

      <Stack spacing={2} sx={{ mt: 2, marginLeft: '580px', color: 'var(--subtitle)' }}>
        <Pagination
          count={Math.ceil(rows.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default Line;
