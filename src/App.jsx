import './App.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validateForm from './validateForm';

function App() {
  // État initial pour les champs du formulaire et les messages d'erreur
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dateNaissance: '',
    ville: '',
    codePostal: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Gestion des changements des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify(formData));
      toast.success("Inscription réussie !");
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        dateNaissance: '',
        ville: '',
        codePostal: ''
      });
    } else {
      toast.error("Des erreurs sont présentes dans le formulaire.");
    }
  };

  useEffect(() => { 
    const v = validateForm(formData);
    setIsFormValid(v.formIsValid);
    setErrors(v.newErrors);
  }, [formData]);

  return (
    <div>
      <form data-testid="form" onSubmit={handleSubmit}>
        <div data-testid="divNom">
          <label data-testid='labelNom'>Nom:</label>
          <input
            data-testid="inputNom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          {errors.nom && <p className='error'>{errors.nom}</p>}
        </div>
        <div data-testid="divPrenom" >
          <label data-testid='labelPrenom'>Prénom:</label>
          <input
            data-testid="inputPrenom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          {errors.prenom && <p className='error'>{errors.prenom}</p>}
        </div>
        <div data-testid="divEmail">
          <label data-testid='labelEmail'>Email:</label>
          <input
            data-testid="inputEmail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>
        <div data-testid="divDate">
          <label data-testid='labelDate'>Date de naissance:</label>
          <input
            data-testid="inputDate"
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            required
          />
          {errors.dateNaissance && <p className='error'>{errors.dateNaissance}</p>}
        </div>
        <div data-testid="divVille">
          <label data-testid='labelVille'>Ville:</label>
          <input
            data-testid="inputVille"
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
          />
          {errors.ville && <p className='error'>{errors.ville}</p>}
        </div>
        <div id='inputZip' data-testid="divZip">
          <label data-testid='labelZip'>Code Postal:</label>
          <input
            data-testid="inputZip"
            type="text"
            name="codePostal"
            pattern="\d{5}"
            value={formData.codePostal}
            onChange={handleChange}
            required
          />
          {errors.codePostal && <p className='error'>{errors.codePostal}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>Sauvegarder</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
