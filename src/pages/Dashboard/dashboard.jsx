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

    return (
    <>
        
        <header></header>
        <main></main>
        <footer></footer>
    </>)


};

export default Dashboard;
