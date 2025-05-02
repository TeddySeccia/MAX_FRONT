import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser.jsx";
import Header from "../../components/header/header.jsx";

/**
 * Composant de layout standard pour toutes les sous-pages.
 * Il affiche le Header et un bloc principal (children) passé dynamiquement.
 * Il vérifie aussi si l'utilisateur est connecté.
 */
const SousPage = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Header />

      {children}

    </>
  );
};

export default SousPage;
