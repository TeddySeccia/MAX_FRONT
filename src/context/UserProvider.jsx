import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {

                // Vérifie si le token est toujours valide via /checkToken
                const check = await fetch(`${VITE_API_URL}/checkToken`, {
                    method: 'GET',
                    credentials: 'include', // Important pour envoyer les cookies !
                    
                    
                });

                if (!check.ok) {
                    console.warn("Token invalide ou expiré");
                    setUser(null);
                    return;
                }

                // Si token OK, récupère les infos utilisateur
                const userRes = await fetch(`${VITE_API_URL}/getUser`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                } else {
                    console.error("Erreur récupération utilisateur");
                    setUser(null);
                }

            } catch (err) {
                console.error("Erreur lors de la vérification du token :", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    
    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
