import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirige vers login si pas connecté
        }
    }, [navigate]);

    return <h1>Bienvenue sur le Dashboard !</h1>;
};

export default Dashboard;
