import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import "./InvociesBalances.css";

const InvociesBalances = () => {
  const [allImmobiliers, setAllImmobiliers] = useState([]);
  const [error, setError] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    type: "",
    image: null,
    address: "",
    position: "",
    country: "",
    years: "",
    description: "",
    imageLG: null,
    bathrooms: "",
    bedrooms: "",
    surface: "",
    price: "",
  });

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    // Check if the input name is "position"
    if (name === "position") {
      setModifiedData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setModifiedData((prevData) => ({ ...prevData, [name]: value }));
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    // If an image file has been selected, append it to the formData
    if (modifiedData.image) {
      formData.append("files.image", modifiedData.image);
    }

    // Append the "imageLG" field to the formData
    if (modifiedData.imageLG) {
      formData.append("files.imageLG", modifiedData.imageLG);
    }

    try {
      const response = await axios.post(
        "http://localhost:1337/api/immobiliers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/immobiliers")
      .then(({ data }) => {
        setAllImmobiliers(data.data);
        console.log(data.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className="InvociesBalances">
      <form onSubmit={handleSubmit} id="immobilierForm">
        <select
          type="text"
          name="type"
          placeholder="Type"
          onChange={handleInputChange}
          value={modifiedData.type}
          className="inputproduit"
        >
          <option value="House">House</option>
          <option value="Appartement">Appartement</option>
          <option value="Terrain">Terrain</option>
        </select>

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          value={modifiedData.address}
          className="inputproduit"
        />

        <input
          type="JSON"
          name="position"
          placeholder="Position"
          onChange={handleInputChange}
          value={modifiedData.position}
          className="inputproduit"
        />

        <select
          type="text"
          name="country"
          onChange={handleInputChange}
          value={modifiedData.country}
          className="inputproduit"
        >
          <option value="Marrakech">Marrakech</option>
          <option value="Agadir">Agadir</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Fes">Fes</option>
        </select>

        <input
          type="text"
          name="years"
          placeholder="Years"
          onChange={handleInputChange}
          value={modifiedData.years}
          className="inputproduit"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          value={modifiedData.description}
          className="inputproduit"
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="N Bathrooms"
          onChange={handleInputChange}
          value={modifiedData.bathrooms}
          className="inputproduit"
        />

        <input
          type="number"
          name="bedrooms"
          placeholder="N Bedrooms"
          onChange={handleInputChange}
          value={modifiedData.bedrooms}
          className="inputproduit"
        />

        <input
          type="number"
          name="surface"
          placeholder="Surface"
          onChange={handleInputChange}
          value={modifiedData.surface}
          className="inputproduit"
        />

        <input
          type="number"
          name="price"
          placeholder="Price in $"
          onChange={handleInputChange}
          value={modifiedData.price}
          className="inputproduit"
        />

        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          className="inputproduit"
          onChange={(e) => {
            setModifiedData((prevData) => ({
              ...prevData,
              image: e.target.files[0],
            }));
          }}
        />

        <input
          type="file"
          name="imageLG"
          accept="image/png, image/jpeg"
          className="inputproduit"
          onChange={(e) => {
            setModifiedData((prevData) => ({
              ...prevData,
              imageLG: e.target.files[0],
            }));
          }}
        />
        <input
          type="file"
          name="imagePL"
          accept="image/png, image/jpeg"
          className="inputproduit"
          onChange={(e) => {
            setModifiedData((prevData) => ({
              ...prevData,
              imagePL: e.target.files[0],
            }));
          }}
        />

        <br />
        <button type="submit" className="butAch">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InvociesBalances;
