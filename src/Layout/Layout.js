import React, { Suspense } from 'react'
import './css/Layout.css'
import { isMobile } from 'react-device-detect';
import OmarLencina from '../Components/OmarLencina';

export default function Layout({ children }) {

  let environment = isMobile ? 'layoutMobile' : 'layoutDesktop'
  const Children = children;

  return (
    <Suspense fallback={ 'Cargando...' } >
      <main className={environment + ' LayoutNoAuth'}>  
        <Children/>
        <OmarLencina/>
      </main>
    </Suspense>
  )
}