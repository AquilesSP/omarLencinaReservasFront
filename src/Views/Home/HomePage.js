import React, { useState } from 'react'
import './css/homepage.css'
import LogIn from '../Login/LogIn'
import Register from '../Login/Register'

export default function HomePage() {
  
  const [formStatus, setFormStatus] = useState(0);

  const STATUS_STATES = [
    <Conditions setFormStatus={setFormStatus} />,
    <Register setFormStatus={setFormStatus} />,
    <LogIn setFormStatus={setFormStatus} />
  ];

  return (
    <article className='homepage'>
      <div className='homepage-bg-box'/>

      <div className='homepage-container'>
        <section className='homepage-header'>
          <span>OL</span>
          <h1>CRUCEROS</h1>
          <p>your activity booking app</p>
        </section>

        <section className='om-card'>

          {STATUS_STATES[formStatus]}

        </section>
      </div>
    </article>
  )
}

function Conditions({ setFormStatus }) {
  const [politicas, setPoliticas] = useState(true);
  const [terminos, setTerminos] = useState(true);

  // Función para manejar el cambio de los checkboxes
  const handleCheckboxChange = (setter) => (event) => {
    setter(event.target.checked);
  };

  return (
    <div>
      <legend>Regístrate o Ingresa</legend>

      <hr />
      <br />

      <fieldset className='row-flex aling-center'>
        <input
          type="checkbox"
          id="politicas"
          name="politicas"
          checked={politicas}
          onChange={handleCheckboxChange(setPoliticas)}
        />
        <label htmlFor="politicas">Acepto Políticas de Privacidad</label>
      </fieldset>

      <fieldset className='row-flex aling-center'>
        <input
          type="checkbox"
          id="terminos"
          name="terminos"
          checked={terminos}
          onChange={handleCheckboxChange(setTerminos)}
        />
        <label htmlFor="terminos">Acepto Términos de Uso</label>
      </fieldset>

      <br />

      <div>
        <button onClick={()=> setFormStatus(1)} disabled={!politicas || !terminos}>Registrar mi estadía</button>
        <button onClick={()=> setFormStatus(2)} disabled={!politicas || !terminos}>Ingresar</button>
      </div>
    </div>
  );
}