import React, { Suspense } from 'react'

import Login from '../views/login/Login';


export default function LayoutLogin({ children }) {

  let environment = 'layoutDesktop'
  const Children = children;

  if(isMobile){
    return (
      <main className={environment}>  
          <Suspense fallback={ 'Cargando...' } >
            <Children/>
          </Suspense>
        </main>
    )
  } else{
    return <Login/>
  }

}
