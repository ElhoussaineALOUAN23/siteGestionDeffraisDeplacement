import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Lottie from 'lottie-react';
import profile from '../../../animation/profile.json';
import axios from 'axios';

const ProfileForme = () => {
  const [nom, setNom] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [imageBon, setImageBon] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('date', date);
      formData.append('position', position);
      formData.append('message', message);

      if (imageBon) {
        formData.append('imageBon', imageBon);
      }

      const response = await axios.post('http://localhost:9090/api/article/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset the form if necessary
      setNom('');
      setDate('');
      setPosition('');
      setMessage('');
      setImageBon(null);

      console.log('Article added successfully:', response.data);
      alert(`Your article has been added successfully!`);
    } catch (error) {
      // Improve error handling and display
      console.error('Error submitting the form:', error);
      if (error.response) {
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      }
    }
  };

  const handlePhotoChange = (event) => {
    setImageBon(event.target.files[0]);
  };

  return (
    <div style={{
      display: 'block',
      margin: 'auto',
      textAlign: 'center',
    }}>
      <Lottie
        style={{
          height: 80,
          width: 80,
          display: 'block',
          margin: 'auto',
          textAlign: 'center',
           
        }}
        animationData={profile}
      />
      <br />
      <TextField
        label="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        style={{ width: 600, marginBottom: 10 }}
      />
      <br />
      <TextField
        type="datetime-local"
         
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: 600, marginBottom: 10 }}
      />
      <br />
      <TextField
        label="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        style={{ width: 600, marginBottom: 10 }}
      />
      <br />
      <textarea
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ minWidth: 600, marginBottom: 10, backgroundColor: 'transparent', minHeight: 120,color:"var(--title)",fontSize:"20px" }}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ marginBottom: 10 }}
      />
      <br />
      <button className="M9Property" onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ProfileForme;
