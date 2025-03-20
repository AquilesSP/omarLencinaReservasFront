import React, { useState } from 'react'
import { BiLeftArrowAlt } from "react-icons/bi";

export default function Register({ setFormStatus }) {

  const [name, setName] = useState('');
  const [numberId, setNumberId] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza el estado 'name'
  };

  const handleNumberIdChange = (event) => {
    setNumberId(event.target.value); // Actualiza el estado 'numberId'
  };

  const handleAbordarClick = () => {
    // Creo el objeto con los datos
    const reservaData = {
      name: name,
      numberId: Number(numberId), // Se asegura de convertir numberId a número
      fullName: `${name} - ${numberId}` // Crea el fullName combinando name y numberId
    };

    // Guardo en el localStorage bajo el nombre 'olReservaData'
    localStorage.setItem('olReservaData', JSON.stringify(reservaData));

    // cambio el stado del HomePage para que pida informacion con los datos ingresados
    window.location.reload()
  };

  // Validación para habilitar el botón "Abordar"
  const isFormValid = name.length >= 8 && numberId.length >= 8;

  return (
    <div>
      <legend>Las actividades te esperan</legend>

      <hr />
      <br />

      <fieldset>
        <label htmlFor="name">Ingresa tu nombre completo</label>
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder='Alex Doe'
        />
      </fieldset>

      <fieldset>
        <label htmlFor="numberId">Ingresa tu identificación</label>
        <input
          value={numberId}
          onChange={handleNumberIdChange}
          type="number"
          placeholder='DNI / PASSPORT / UUID'
        />
      </fieldset>

      <br />

      <div className='grid-2-8'>
        <button onClick={() => setFormStatus(0)} className='btn-secondary btn-icon'>
          <BiLeftArrowAlt size={32} />
        </button>
        <button onClick={handleAbordarClick} disabled={!isFormValid}>
          Abordar
        </button>
      </div>

    </div>
  );
}
