import React, { useState } from 'react'
import { BiLeftArrowAlt } from "react-icons/bi";

export default function LogIn({setFormStatus}) {

  const [numberId, setNumberId] = useState('');

  // Función para manejar el cambio en el input de número de identificación
  const handleNumberIdChange = (event) => {
    setNumberId(event.target.value); // Actualiza el estado 'numberId'
  };

  // Función para manejar el click en el botón Abordar
  const handleAbordarClick = () => {
    // Crear el objeto con los datos
    const reservaData = {
      numberId: Number(numberId), // Se asegura de convertir numberId a número
      fullName: null, // Undefined para continuar con el flow
      name: null, // lo pasará a la vista de reservas donde tomara el dato name
    };

    // Guarda en el localStorage bajo el nombre 'olReservaData'
    localStorage.setItem('olReservaData', JSON.stringify(reservaData));

    // cambia el stado del HomePage para que pida informacion con los datos ingresados
    window.location.reload()
  };

  // Validación para habilitar el botón "Abordar"
  const isFormValid = numberId.length >= 8;
  return (
    <div>
      <legend>
        Tus actividades te esperan
      </legend>

      <hr />
      <br />

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
        <button disabled={!isFormValid} onClick={()=> handleAbordarClick()}>
          Abordar
        </button>
      </div>

    </div>
  );
}
