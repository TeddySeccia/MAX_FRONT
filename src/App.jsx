import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";

import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/Login/login';
import QuickView from './pages/QuickView/QuickView'


import './App.css';

import UserContext from './context/UserContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <div>Chargement de l’utilisateur...</div>; // spinner optionnel
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function RouteTracker() {
  const location = useLocation();
  // on garde en ref l'URL *avant* le changement en cours
  const prevRef = useRef(location.pathname + location.search);

  useEffect(() => {
    // À chaque nouveau changement de `location`, on écrit en sessionStorage
    sessionStorage.setItem("previousPath", prevRef.current);
    // Puis on met à jour prevRef pour la prochaine navigation
    prevRef.current = location.pathname + location.search;
  }, [location]);

  return null; // rien à rendre
}

export default function App() {
  const { loading } = useContext(UserContext);

  // Optionnel : pour bloquer tout le rendu tant que le contexte charge
  if (loading) {
    return <div>Chargement global...</div>;
  }

  return (
    <>
      {/* On insère le tracker avant les Routes */}
      <RouteTracker />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quickView/:id"
          element={
            <ProtectedRoute>
              <QuickView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>

  );
}
