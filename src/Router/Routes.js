import React from "react";
import Layout from "../Layout/Layout";
import LayoutNoAuth from "../Layout/LayoutNoAuth";
import HomePage from "../Views/Home/HomePage";
import ReservasView from "../Views/Reserva/ReservasView";

const RoutesUrls = [
  {
    path: "/",
    exact: true,
    main: () => <LayoutNoAuth children={ HomePage } pageName={'HomePage'}/>
  },
];


const PrivateRoutes = [

  /* ======== PRIVADITAS ======== */

  {
    path: "/",
    exact: true,
    label: 'ReservasView',
    main: () => <Layout children={ ReservasView } pageName={'ReservasView'} hideTheFooter={true}/>
  },
];


export default RoutesUrls;
export{PrivateRoutes}