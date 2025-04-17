import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser.jsx";
import Header from '../../components/header/header.jsx'
import Main from './components/dashboard_main/dashboard_main.jsx'





const Dashboard = () => {

    const navigate = useNavigate();
    const { user } = useUser();
    useEffect(() => {
        // Si l'utilisateur est null, on redirige
        if (user === null) {
          navigate("/login");
        }
      }, [user, navigate]);

    return (
        <>
            <Header />
            <Main />

        </>)
};

export default Dashboard;
