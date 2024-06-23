import { useMain } from "./contexts/MainContext";
// import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EstimatedEmissions from "./pages/EstimatedEmissions";
import PlantTree from "./pages/PlantTree";
import Donate from "./pages/Donate";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";

function RouterCustom() {
  const { isAuth } = useMain() || {};
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate replace to="landingPage" />} />
        {/* Rotte protette per utenti autenticati */}
        <Route
          path="dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="estimatedemissions"
          element={isAuth ? <EstimatedEmissions /> : <Navigate to="/" />}
        />

        <Route
          path="planttree"
          element={isAuth ? <PlantTree /> : <Navigate to="/" />}
        />

        <Route
          path="donate"
          element={isAuth ? <Donate /> : <Navigate to="/" />}
        />

        <Route
          path="donatecallback"
          element={isAuth ? <Donate /> : <Navigate to="/" />}
        />

        <Route
          path="auth/telegram/callback"
          element={isAuth ? <Donate /> : <Navigate to="/" />}
        />
        {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}

        <Route
          path="landingPage"
          element={!isAuth ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        {/* <Route
          path="cover"
          element={!isAuth ? <Cover /> : <Navigate to="/home" />}
        /> */}

        {/* route accessibili allo stesso modo da utenti autrntificati o NO */}

        {/* <Route path="about" element={<About />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterCustom;
