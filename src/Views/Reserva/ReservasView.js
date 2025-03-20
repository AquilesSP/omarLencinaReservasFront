import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'; // Importa react-hot-toast
import { clearLocalStorage, getSessionFromLocalStorage } from '../../Utils/actions';
import { BiDoorOpen, BiTrash } from 'react-icons/bi';
import './reservas.css';
import UpdateName from '../Login/UpdateName';
import ListServices from './ListServices';

export default function ReservasView() {
  const [userData, setUserData] = useState(null);
  const [userReservas, setUserReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // Estado para saber qué reserva está eliminándose

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchReservas = useCallback(async (numberId) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/reserva/${numberId}`);
      setUserData(data.userData);
      setUserReservas(data.userReservas);
    } catch (error) {
      console.error("Error obteniendo reservas:", error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);
  
  const getMyData = useCallback(() => {
    const sessionData = getSessionFromLocalStorage();
    if (sessionData) {
      setUserData(sessionData);
      fetchReservas(sessionData.numberId);
    } else {
      setLoading(false);
    }
  }, [fetchReservas]);
  
  useEffect(() => {
    getMyData();
  }, [getMyData]);
  

  // Función para eliminar reserva
  const handleDeleteReserva = async (id) => {
    setDeleting(id); // Deshabilita el botón

    try {
      await axios.delete(`${API_BASE_URL}/reserva/${id}`);
      toast.success("Reserva eliminada correctamente");

      // Recargar datos sin refrescar la página completa
      setUserReservas(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
    } catch (error) {
      toast.error("Error al eliminar la reserva");
      console.error("Error eliminando reserva:", error);
    } finally {
      setDeleting(null); // Habilita el botón nuevamente
    }
  };

  const handleLogout = () => {
    clearLocalStorage();
    window.location.reload();
  };

  function reservarActividad(reservas) {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!userData || !userData.name || !userData.fullName) {
      return <UpdateName getMyData={getMyData} userData={userData} />;
    }

    return <ListServices userReservas={reservas} userData={userData} />;
  }

  return (
    <article className='reservas-container'>      
      <nav className='reservas-nav grid-8-2'>
        <div>
          <h4>OL Cruceros</h4>
          <p>Your activity booking app</p>
        </div>
        <button onClick={handleLogout} className='btn-secondary btn-icon'>
          <BiDoorOpen size={32} />
        </button>
      </nav>

      <section className='reservas-activities om-card'>
        <h4>Programadas para hoy</h4>
        <ul>
          {userReservas.length > 0 
            ? userReservas.map(reserva => (
                <li className='om-card' key={reserva.id}>
                  <div className='om-card reservas-activities-box grid-8-2'>
                    <div className="tile" style={{ backgroundColor: reserva.servicioColor }}></div>
                    <div>
                      <div className='reservaTitle' style={{ color: reserva.servicioColor }}>
                        {reserva.servicioNombre}
                      </div>
                      <h2>
                        <span>Horario:</span>{' '}
                        <strong>
                          {new Date(reserva.fechaDesde).toLocaleTimeString()} - {new Date(reserva.fechaHasta).toLocaleTimeString()}
                        </strong>
                      </h2>
                    </div>
                    <button 
                      name='eliminarReserva' 
                      className='btn-icon btn-secondary bg-none'
                      onClick={() => handleDeleteReserva(reserva.id)}
                      disabled={deleting === reserva.id} // Deshabilita si está eliminando
                    >
                      {deleting === reserva.id ? "Eliminando..." : <BiTrash size={28} />}
                    </button>
                  </div>
                </li>
              ))
            : <li><h2>No tienes ninguna reserva aún</h2></li>
          }
        </ul>
        <br />
        <hr />
        <br />
        {reservarActividad(userReservas)}

      </section>

    </article>
  );
}
