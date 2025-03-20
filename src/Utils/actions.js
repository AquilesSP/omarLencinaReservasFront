export const getSessionFromLocalStorage = () => {
  // Verifica si existe 'olReservaData' en el localStorage
  const reservaData = localStorage.getItem('olReservaData');
  return reservaData ? JSON.parse(reservaData) : null;
};

// Elimina los datos del localStorage
export const clearLocalStorage = () => {
  localStorage.clear(); 
};
