# Web App de Reservas

Esta es una aplicación web desarrollada con **React.js** que permite a los usuarios gestionar reservas de servicios.  

## 🛠️ Tecnologías utilizadas

- **React.js** (Frontend)
- **API REST** (Backend)
- **LocalStorage** (Gestión de sesión sin registro)
- **Fetch API** (Solicitudes HTTP a la API)

## 🚀 Funcionamiento

### 🧑‍💻 Escenarios de uso

1. **Usuario sin registrar:**  
   - Puede guardar variables de sesión en `localStorage` para usarlas más adelante.

2. **Usuario con reservas guardadas en el servidor:**  
   - Debe ingresar un **DNI / Pasaporte / Código numérico** de al menos **8 caracteres** para acceder.  

---

### 📅 Flujo de reserva

1. **Ingreso del usuario:**  
   - El usuario ingresa su código de identificación.  
   - La aplicación consulta la API para obtener las reservas existentes del día actual.  

2. **Consulta de reservas:**  
   - Si el usuario **tiene reservas**, estas se muestran en pantalla.  
   - Si **no tiene reservas**, se le solicita ingresar un **nombre completo válido** para continuar.  

3. **Selección de servicio:**  
   - Se obtiene la lista de servicios disponibles desde la API.  
   - Si el usuario ya tiene una reserva para un servicio en la fecha actual, esa opción se deshabilita.  
   - Si no, el usuario puede seleccionar un servicio y se muestran los horarios disponibles.  

4. **Confirmación de reserva:**  
   - El usuario selecciona un horario y presiona **"Continuar"**.  
   - Se envía una solicitud **POST** a la API con los datos de la reserva:

   ```json
   {
     "cliente": "Nombre - Código de identificación",
     "servicioId": "ID del servicio",
     "fechaDesde": "date con timezone",
     "fechaHasta": "date con timezone"
   }
