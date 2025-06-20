import React from "react";
import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import LayoutAdmin from "../layoutsAdmin/LayoutAdmin";
import AuthGuard from "../utils/AuthGuard";
const PageNotfound = Loadable(lazy(() => import("../commoncomponents/PageNotfound/PageNotfound")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Tyre = Loadable(lazy(() => import("../pages/tyre")));
const TyreList = Loadable(lazy(() => import("../pages/tyreList")));
const EngineOilList = Loadable(lazy(() => import("../pages/EngineOilList")));
const EngineOil = Loadable(lazy(() => import("../pages/EngineOil")));
const Battery = Loadable(lazy(() => import("../pages/battery")));
const BatteryList = Loadable(lazy(() => import("../pages/batteryList")));
// const ChangePassword = Loadable(lazy(() => import("../pages/ChangePassword")));


const PrivateRoutes = {
  path: "/",
  element: (
    <AuthGuard allowedRoles={[0, 1, 2]}>
    <LayoutAdmin />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    // {
    //     path: "changepassword",
    //     element: (
    //         <AuthGuard allowedRoles={[1]}>
    //             <ChangePassword />
    //         </AuthGuard>
    //     )
    // },
    {
      path: "tyre-list",
      element: <TyreList />,
    },
    {
      path: "/tyre-edit/:id",
      element: <Tyre />,
    },
    {
      path: "/tyre-add",
      element: <Tyre />,
    },
    {
      path: "engineoil-list",
      element: <EngineOilList />,
    },
    {
      path: "engineoil-edit/:id",
      element: <EngineOil />
    },
    {
      path: "engineoil-add",
      element: <EngineOil />
    },
    {
      path: "battery-list",
      element: <BatteryList />,
    },
    {
      path: "/battery-edit/:id",
      element: <Battery />,
    },
    {
      path: "/battery-add",
      element: <Battery />,
    },
    {
      path: "*",
      element: <PageNotfound />,
    },
  ],
};

export default PrivateRoutes;
