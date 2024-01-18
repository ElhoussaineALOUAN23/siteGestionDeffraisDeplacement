import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Facture = () => {
    const [demmandes, setDemmandes] = useState([]);

    useEffect(() => {
        const fetchDemmandes = async () => {
            try {
                const response = await axios.get("http://localhost:9090/api/demmandes");
                setDemmandes(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des demandes:', error);
            }
        };

        fetchDemmandes();
    }, []);

    return (
        <>
            {demmandes.map((item) => (
                <div key={item.id} className='flex' style={{ color: "rgb(24 24 27)"}}>
                     <article key={item.imageBon} className="card" >
                    <img
                      style={{ width: "280px", height: "300px", borderRadius: 13 }}
                      src={`data:image/jpeg;base64, ${item.imageBon}`}
                      alt={`Product ${item.nom}`}
                    />
                    </article>
                </div>
            ))}
        </>
    );
};

export default Facture;
