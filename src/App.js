import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutesUrls, { PrivateRoutes } from "./Router/Routes";
import { Toaster } from "react-hot-toast";
import { getSessionFromLocalStorage } from "./Utils/actions";

function App() {
  const [session, setSession] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const sessionData = getSessionFromLocalStorage(); // Llamamos la función desde el action
    if (sessionData) {
      setSession(sessionData);
    }

    setTimeout(() => {
      setLoadingData(false)
    }, 1000);
      
  }, []);

  // Muestra una pantalla de carga si estamos cargando los datos
  if (loadingData) {
    return (
      <div>
        <span>OL</span>
        <h1>Cruceros</h1>
        <p>your activity booking app</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
        {session ? (
          <Routes>
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.main />}
              />
            ))}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Routes>
            {RoutesUrls.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.main />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
    </>
  );
}

export default App;
