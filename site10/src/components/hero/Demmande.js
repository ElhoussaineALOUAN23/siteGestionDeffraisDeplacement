import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import Facture from "./Facture";

const Demmande = () => {
    const [type, setType] = useState('');
    const [montant, setMontant] = useState(0);
    const [date, setDate] = useState("");
    const [imageBon, setImageBon] = useState(null);
    const [description, setDescription] = useState('');
    const [etat, setEtat] = useState("En cours");
    const [cin, setCin] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [msj, setMsj] = useState("aucunne");
    const [isModalOpen, setModalOpen] = useState(false);
   

    const [selectedDemmande, setSelectedDemmande] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('type', type);
        formData.append('montant', montant);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('etat', etat);
        formData.append('cin', cin);
        formData.append('nom', nom);
        formData.append('email', email);
        formData.append('msj', msj)

        if (imageBon) {
            formData.append('imageBon', imageBon);
        }

        axios.post('http://localhost:9090/api/demmandes/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                setType('');
                setMontant(0);
                setDate('');
                setImageBon(null);
                setDescription('');
                setEtat('En cours');
                setCin('');
                setNom('');
                setEmail('');
                setMsj('aucunne')
                console.log('Demande ajoutée avec succès:', response.data);
                alert(`Votre code de suivi de demande est : ${response.data.codeSuivi}`);
                setModalOpen(true);

            })
            .catch((error) => {
                console.error('Erreur lors de la soumission du formulaire :', error);
                if (error.response) {
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                    console.log('Headers:', error.response.headers);
                }
            });
    };
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

    const handlePhotoChange = (event) => {
        setImageBon(event.target.files[0]);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div style={{ color: "var(--title)", marginBottom: "40px", marginTop: "30px" }}>
                    <h1>Saisir Votre Demande</h1>
                </div>

                <label htmlFor="nom" style={{ marginLeft: "100px" }}>Nom : </label>
                <input type="text" className="form-control" id="nom" value={nom}
                    onChange={(e) => setNom(e.target.value)} />
                <label htmlFor="nom" style={{ marginLeft: "120px" }}>Email : </label>
                <input type="text" className="form-control" id="nom" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="cin" style={{ marginLeft: "100px" }}>Cin :   &nbsp; </label>
                <input type="text" className="form-control" id="cin" value={cin}
                    onChange={(e) => setCin(e.target.value)} />

                <label htmlFor="type" style={{ marginLeft: "128px" }}>Type : </label>
                <input type="text" className="form-control" id="type" value={type}
                    onChange={(e) => setType(e.target.value)} />
                <br />
                <label htmlFor="description" style={{ marginLeft: "100px" }}>Desc: </label>
                <input type="text" className="form-control" id="description" value={description}
                    onChange={(e) => setDescription(e.target.value)} />

                <label htmlFor="montant" style={{ marginLeft: "100px" }}>Montant : </label>
                <input type="number" step="any" className="form-control" id="montant" value={montant}
                    onChange={(e) => setMontant(parseFloat(e.target.value) || 0)} />
                <br />
                <label htmlFor="date" style={{ color: 'var(--subtitle)', marginLeft: "100px" }}>Date : </label>
                <input type="datetime-local" className="form-control" id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />
                <label htmlFor="photo" style={{ color: 'var(--subtitle)', marginLeft: "160px" }}>Image de Bon : </label>
                <input type="file" className="form-control" accept="image/*" id="photo"
                    onChange={handlePhotoChange} />
                <br />
                <button type="submit" className="M9Property">Ajouter</button>
            </form>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
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
                <h1 style={{ color: "rgb(24 24 27)", textAlign: "center" }}>Facture</h1>
                 
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

            </Modal>
        </>
    );
}

export default Demmande;
