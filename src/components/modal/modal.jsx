import { useState,useEffect, useContext } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../api/userApi';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import './modal.css'
import { Button } from '../button/button'
import UserContext from '../../context/UserContext';


const VITE_API_URL = import.meta.env.VITE_API_URL;



export const CustomModal = ({ isOpen, onClose, title, children, isDesktop }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal" isDesktop={isDesktop}>
            <h2>{title}</h2>
            {children}  {/* Affiche le contenu spécifique de chaque modale */}
        </Modal>

    );
};

export const LoginModal = ({ isOpen, onClose, isDesktop }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {refetchUser} = useContext(UserContext)
  
    const lastUser = JSON.parse(localStorage.getItem('lastUser') || 'null');
    // ou récupérer via localStorage dans un useEffect si tu préfères
  
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: async (user) => {
          localStorage.setItem(
            'lastUser',
            JSON.stringify({
              id:     user.idUser,
              name:   user.userFName,
              gender: user.userSex,
              email:  user.userMail,
            })
          );

          queryClient.setQueryData(['currentUser'], user);
          queryClient.setQueryData(['lastUser'], {
            email: user.userMail,
            name: user.userFName,
            id: user.idUser,
          });

          await refetchUser();
          
          console.log("modal53 user", user);
          console.log("modal54 lastUser", lastUser);
          
          
          
          onClose();
          navigate('/dashboard');
        },
        onError: () => {
          setErrorMessage('Email ou mot de passe incorrect');
        },
      });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setErrorMessage('');
      loginMutation.mutate({ email, password });
    };
  
    useEffect(() => {
      if (lastUser) {
        setEmail(lastUser.email);
      }
    }, [lastUser]);
   
  
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title="Connexion">
          {lastUser && !isDesktop ? (
            <form onSubmit={handleSubmit}>
              <p><strong>Bonjour {lastUser.name} !</strong></p>
    
              {errorMessage && <p className="error">{errorMessage}</p>}
    
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
    
              <div className="modalButtonContainer">
                <Button
                  icon="/icones/meta/Valid.webp"
                  style={{ backgroundColor: "#6EBF7D" }}
                  type="submit"
                  disabled={loginMutation.isLoading}
                />
                <Button
                  type="button"
                  icon="/icones/meta/Cancel.webp"
                  onClick={onClose}
                >
                  Annuler
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && <p className="error">{errorMessage}</p>}
    
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
    
              <div className="modalButtonContainer">
                <Button
                  icon="/icones/meta/Valid.webp"
                  style={{ backgroundColor: "#6EBF7D" }}
                  type="submit"
                  disabled={loginMutation.isLoading}
                />
                <Button
                  type="button"
                  icon="/icones/meta/Cancel.webp"
                  onClick={onClose}
                >
                  Annuler
                </Button>
              </div>
            </form>
          )}
        </CustomModal>
      );
    };
  

export const RegisterModal = ({ isOpen, onClose, }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [fName, setFName] = useState("");
    const [genre, setGenre] = useState("HOMME");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setFName("");
        setGenre("HOMME");
        setAdress("");
        setPhone("");
        setBirthDate("");
        setAvatar(null);
        setAvatarPreview(null);
    };


    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userMail", email);
        formData.append("userPassword", password);
        formData.append("confirmPassword", confirmPassword);
        formData.append("userName", name);
        formData.append("userFName", fName);
        formData.append("userSex", genre);
        formData.append("userAdress", adress);
        formData.append("userTel", phone);
        formData.append("userBirthDate", birthDate);
        if (avatar) {
            formData.append("userAvatar", avatar);
        }

        console.log(formData + "modal191");


        try {
            const response = await fetch(VITE_API_URL + "/addUser", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log(data + "modal201");

            if (response.ok) {
                setIsSuccess(true); // Affiche le message de succès
                setTimeout(() => {
                    resetForm(); // Réinitialise le formulaire
                    setAvatarPreview(null); // Réinitialise l'aperçu de l'avatar
                    setIsSuccess(false); // Reset
                    onClose();           // Ferme la modale
                    navigate("/login"); // Redirige
                }, 2000);
            } else {
                alert("Erreur à l'inscription !");
            }
        } catch (error) {
            console.error("Erreur de soumission :", error);
        }
    };

    return (

        <CustomModal isOpen={isOpen} onClose={onClose} title="Inscription">
            {isSuccess ? (
                <div className="success-message">
                    <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                        ✅ <strong>Création de profil réussie !</strong><br />Redirection...
                    </p>
                </div>
            ) : (

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
                    <label htmlFor="confirmPassword">Confirmation de mot de passe</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="name">Nom</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="fName">Prénom</label>
                    <input
                        id="fName"
                        type="text"
                        placeholder="John"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        required
                    />
                    <label htmlFor="genre">Genre</label>
                    <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="HOMME">Homme</option>
                        <option value="FEMME">Femme</option>
                        <option value="AUTRE">Autre</option>
                    </select>

                    <label htmlFor="adress">Adresse</label>
                    <input
                        id="adress"
                        type="text"
                        value={adress}
                        onChange={(e) => setAdress(e.target.value)} />

                    <label htmlFor="phone">Téléphone</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />

                    <label htmlFor="birthDate">Date de naissance</label>
                    <input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)} />

                    <label htmlFor="avatar">Choisir un avatar</label>
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />

                    {avatarPreview && (
                        <img src={avatarPreview} alt="Aperçu de l'avatar" style={{ width: "100px", borderRadius: "50%" }} />
                    )}

                    <div className='modalButtonContainer'>
                        <Button icon="/icones/meta/Valid.webp" style={{ backgroundColor: "#6EBF7D" }} type="submit">
                        </Button>
                        <Button type='button' icon="/icones/meta/Cancel.webp" onClick={onClose}>Annuler</Button>
                    </div>
                </form>
            )}
        </CustomModal>
    );
};

export const LogoutModal = ({ isOpen, onClose }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
  
    const handleLogout = (e) => {
      e.preventDefault();
      setIsSuccess(true);
      setTimeout(() => {
        logout();
        setIsSuccess(false);
        onClose();
        navigate('/login');
      }, 2000);
    };
  
    return (
      <CustomModal isOpen={isOpen} onClose={onClose} title="Déconnexion">
        {isSuccess ? (
          <div className="success-message">
            <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
              ✅ A bientôt sur <strong>MAX</strong><br />Redirection...
            </p>
          </div>
        ) : (
          <div className="logout-message">
            <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
              Vous allez être déconnecté de votre compte !
            </p>
            <p>Êtes-vous sûr de vouloir nous quitter ?</p>
            <div className="modalButtonContainer">
              <Button
                icon="/icones/meta/Valid.webp"
                style={{ backgroundColor: '#6EBF7D' }}
                onClick={handleLogout}
                type="button"
              />
              <Button type="button" icon="/icones/meta/Cancel.webp" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </div>
        )}
      </CustomModal>
    );
  };
