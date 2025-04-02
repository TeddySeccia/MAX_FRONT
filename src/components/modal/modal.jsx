import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import './modal.css'
import { Button } from '../button/button'
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const CustomModal = ({ isOpen, onClose, title, children }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
            <h2>{title}</h2>
            {children}  {/* Affiche le contenu spécifique de chaque modale */}
        </Modal>

    );


};

export const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(VITE_API_URL+"/login", {
                method: "POST",
                headers: {
                     "Content-Type": "application/json" ,
                    },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                onClose(); // Ferme la modale après connexion
                navigate("/dashboard"); // Redirige vers le dashboard
                ;
                
            } else {
                alert("Identifiants incorrects !");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
        }
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Connexion">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Mot de passe</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className='modalButtonContainer'>
                    <Button icon="../../../public/icones/meta/Valid.webp" style={{ backgroundColor: "#6EBF7D" }} type="submit">
                    </Button>
                    <Button type='button' icon="../../../public/icones/meta/Cancel.webp" onClick={onClose}>Annuler</Button>
                </div>
            </form>
        </CustomModal>
    );
};

export const RegisterModal = ({ isOpen, onClose }) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Inscription">
            <form>
                <label htmlFor="name">Nom</label>
                <input id="name" type="text" placeholder="Nom" required />

                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Email" required />

                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" placeholder="Mot de passe" required />

                <div className='modalButtonContainer'>
                    <Button icon="../../../public/icones/meta/Valid.webp" style={{ backgroundColor: "#6EBF7D" }} type="submit">
                    </Button>
                    <Button type='button' icon="../../../public/icones/meta/Cancel.webp" onClick={onClose}>Annuler</Button>
                </div>
            </form>
        </CustomModal>
    );
};
