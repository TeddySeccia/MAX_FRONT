import {  Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/Login/login';


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

export default function App() {
  const { loading } = useContext(UserContext);

  // Optionnel : pour bloquer tout le rendu tant que le contexte charge
  if (loading) {
    return <div>Chargement global...</div>;
  }

  return (
    
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
    
  );
}
