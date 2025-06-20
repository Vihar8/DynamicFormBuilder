import React from "react";
import { lazy } from "react";
import Loadable from "../commoncomponents/Loadable/Loadable";
import Layout from "../layouts/Layout";
import GuestGuard from "../utils/GuestGuard";
import ContactsUs from "../components/AboutPages/ContactsUs";
import GuaranteeWarranty from "../components/AboutPages/GuaranteeWarranty";
import AboutUs from "../components/AboutPages/AboutUs";
import PrivacyPolicies from "../components/AboutPages/PrivacyPolicies";
import TermsConditions from "../components/AboutPages/TermsConditions";
const Landing = Loadable(lazy(() => import("../pages/Landing")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const Tyres = Loadable(lazy(() => import("../pages/tyress")));
const EngineOil = Loadable(lazy(() => import("../pages/engineoilss")));
const Battery = Loadable(lazy(() => import("../pages/batteryss")));

const PublicRoutes = {
  path: "/",
  element: (
    <GuestGuard>
    <Layout />
    </GuestGuard>
  ),
  children: [
    // routing for landing
    {
      path: "",
      element: <Landing />,
    },
    {
      path: "/tyres",
      element: <Tyres />,
    },
    {
      path: "/enginoil",
      element: <EngineOil />,
    },
    {
      path: "/Contactus",
      element: <ContactsUs />,
    },
    // {
    //   path: "/privacypolicy",
    //   element: <PrivacyPolicies />,
    // },
    // {
    //   path: "/termsconditions",
    //   element: <TermsConditions />,
    // },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/guaranteewarranty",
      element: <GuaranteeWarranty />,
    },
    {
      path: "/battery",
      element: <Battery />,
    },
    {
      path: "/login",
      element: <Login />,
    }
  ],
};

export default PublicRoutes;
