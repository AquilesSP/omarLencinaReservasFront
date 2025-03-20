import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BiX } from 'react-icons/bi'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ListServices({ userReservas, userData }) {
  const [dataServices, setDataServices] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [availableTimes, setAvailableTimes] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/servicios`)
        setDataServices(data)
      } catch (error) {
        toast.error('Error al obtener los servicios')
      }
    }
    fetchServices()
  }, [])

  const hasReservationForToday = (serviceId) => {
    if (!Array.isArray(userReservas)) {
      console.error('userReservas no es un array', userReservas)
      return false
    }
    const today = new Date().toISOString().split('T')[0]
    return userReservas.some((reserva) => {
      const reservaFecha = new Date(reserva.fechaDesde).toISOString().split('T')[0]
      return reserva.servicioId === serviceId && reservaFecha === today
    })
  }

  const handleServiceSelection = (service) => {
    setSelectedService(service)
    if (!hasReservationForToday(service.id)) {
      generateAvailableTimes()
    }
  }

  const generateAvailableTimes = () => {
    const times = []
    for (let i = 9; i <= 21; i += 3) {
      const startHour = i
      const endHour = i + 3
      const startTime = `${startHour < 10 ? '0' : ''}${startHour}:00`
      const endTime = `${endHour < 10 ? '0' : ''}${endHour}:00`
      times.push({ startTime, endTime })
    }
    setAvailableTimes(times)
  }

  const handleTimeSelection = (time) => {
    setSelectedTime(time)
  }

  const handleReservation = async () => {
    if (!selectedTime) {
      toast.error('Por favor, selecciona un horario')
      return
    }

    const startAt = new Date(`${new Date().toISOString().split('T')[0]}T${selectedTime.startTime}:00.000Z`)
    const endAt = new Date(`${new Date().toISOString().split('T')[0]}T${selectedTime.endTime}:00.000Z`)

    const reservationData = {
      cliente: userData.fullName,
      servicioId: selectedService.id,
      fechaDesde: startAt.toISOString(),
      fechaHasta: endAt.toISOString()
    }

    try {

      await axios.post(`${API_BASE_URL}/Reserva`, reservationData)
      toast.success('Reserva realizada con éxito')
    } catch (error) {
      toast.error('Error al realizar la reserva')
    }

    window.location.reload()
  }

  const cancelReservation = () => {
    setSelectedService(null) // Restablece la selección de servicio
    setSelectedTime(null) // Restablece la selección de horario
    setAvailableTimes([]) // Limpia los horarios disponibles
  }

  return (
    <div>
      <h4>Reservar un servicio</h4>
      <ul>
        {dataServices.map((service) => (
          (!selectedService || selectedService.id === service.id) && ( // Muestra solo el seleccionado o todos si no hay selección
            <li key={service.id}>
              <button
                style={{ backgroundColor: service.color }}
                onClick={() => handleServiceSelection(service)}
                disabled={hasReservationForToday(service.id)}
              >
                {service.name}
                {hasReservationForToday(service.id) && ' (Ya lo reservaste)'}
              </button>
            </li>
          )
        ))}
      </ul>

      {selectedService && !hasReservationForToday(selectedService.id) && (
        <div>
          <br />
          <h4>Seleccioná un horario</h4>
          <div className="grid-50-50 reserva-schedule-list">
            {availableTimes.map((time, index) => (
              <label key={index} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name="time"
                  checked={selectedTime === time}
                  onChange={() => handleTimeSelection(time)}
                />
                <div
                  className='btn'
                  style={{
                    backgroundColor: selectedTime === time ? 'var(--accent-color)' : 'var(--light-color)',
                    color: selectedTime !== time ? 'var(--accent-color)' : 'var(--light-color)'
                  }}>
                  {`${time.startTime}h a ${time.endTime}h`}
                </div>
              </label>
            ))}
          </div>
          <br />
          <div className='grid-2-8'>
            <button 
              className='btn-icon btn-secondary'
              onClick={cancelReservation}
            >
              <BiX size={32} color='red'/>
            </button>
            <button 
              onClick={handleReservation}
              disabled={!selectedTime}
            >
              Reservar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
