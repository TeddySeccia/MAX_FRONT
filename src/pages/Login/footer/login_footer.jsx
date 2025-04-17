import './login_footer.css'
import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/button/button'
import { useModal } from "../../../hooks/useModal"
import { LoginModal, RegisterModal } from "../../../components/modal/modal";







export default function Login_footer() {
    const { activeModal, openModal, closeModal } = useModal();
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    const [user, setUser] = useState({
        name: 'Undefined',
        gender: 'no_gender'
    });

    // Met à jour la taille de l'écran quand la fenêtre est redimensionnée
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isPortrait = screenSize <= 505;
    const year = new Date().getFullYear()
    const version = "1.0.0"


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("lastUser"));
        if (storedUser) {
            setUser({
                name: storedUser.name || "Undefined",
                gender: storedUser.gender || "no_gender"
            });
        }
    }, []);

    // Fonction pour obtenir le bon chemin d'avatar
    const getAvatarUrl = (gender) => {
        switch (gender) {
            case 'HOMME':
                return '/icones/Man.webp';
            case 'FEMME':
                return '/icones/Woman.webp';
            default:
                return '/icones/No_gender.webp';
        }
    };

    const avatarStyle = {
        backgroundImage: `url(${getAvatarUrl(user?.gender)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const handleSwapUser = () => {
        localStorage.removeItem("lastUser");
        openModal("login");
    };


    return (

        <footer>
            <div className='login_footer_wrapper'>


                {!isPortrait &&
                    <div className='footer_bloc'>
                        <div className='footer_bloc_haut_landscape'>
                            <div className='footer_logo_container'>
                                <img src="/logo/Logo_MAX_blanc.webp" alt="logo MAX blanc" />
                            </div>

                            <nav className='footer_link_container'>
                                <ul>
                                    <li>
                                        <a href="*">Mentions légales</a>
                                    </li>
                                    <hr />
                                    <li>
                                        <a href="*">Site MAX</a>
                                    </li>
                                    <hr />
                                    <li>
                                        <a href="*">Protection des données personnelles</a>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                        <div className='footer_bloc_bas_landscape'>
                            <p>&copy; {year} MY ADMIN XPERT. Tous droits réservés.</p>
                            <p>Version : {version}</p>

                        </div>
                    </div>

                }
                {isPortrait &&
                    <div className="footer_bloc">
                        <div className='footer_bloc_haut_portrait'>
                            <div className='swap_logo container'>
                                <Button icon={"/icones/Swap_user.webp"} onClick={handleSwapUser} />
                            </div>
                            <div className='user_avatar container' style={avatarStyle}>
                                <Button onClick={() => openModal("login")} />
                                <LoginModal isOpen={activeModal === "login"} onClose={closeModal} />
                            </div>
                            <div className='add_user_logo container'>
                                <Button icon={"/icones/Add_user.webp"} onClick={() => openModal("register")} />
                                <RegisterModal isOpen={activeModal === "register"} onClose={closeModal} />

                            </div>


                        </div>
                        <div className='footer_bloc_bas_portrait'>
                            <div className='france_connect_logo container'>
                                <img src="/logo/France_connect_logo.webp" alt="france connect" />
                            </div>
                            <div className='user_name container'>
                                <p>{user?.name}</p>
                            </div>
                            <div className='settings_logo container'>
                                <img src='/icones/Settings.webp' />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </footer>
    )

}