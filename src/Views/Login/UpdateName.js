import React, { useState } from 'react'

export default function UpdateName({ getMyData, userData }) {

  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza el estado 'name'
  };


  // Función para manejar el click en el botón Abordar
  const handleAbordarClick = () => {
    // Crea el objeto con los datos
    const reservaData = {
      name: name,
      numberId: Number(userData.numberId), // Se asegura de convertir numberId a número
      fullName: `${name} - ${userData.numberId}` // Crea el fullName combinando name y numberId
    };

    // Guarda en el localStorage bajo el nombre 'olReservaData'
    localStorage.setItem('olReservaData', JSON.stringify(reservaData));

    // cambia el stado del HomePage para que pida informacion con los datos ingresados
    getMyData()
  };

  // Validación para habilitar el botón "Continuar"
  const isFormValid = name.length >= 8;

  return (
    <div>

      <fieldset>
        <label htmlFor="name"><strong>Para reservar</strong> ingresá tu nombre completo</label>
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder='Alex Doe'
        />
      </fieldset>

      <button onClick={handleAbordarClick} disabled={!isFormValid}>
        Continuar
      </button>

    </div>
  );
}
