import './login_footer.css'
import React, { useState, useEffect } from 'react';





export default function Login_footer() {
    const [screenSize, setScreenSize] = useState(window.innerWidth);

    // Met à jour la taille de l'écran quand la fenêtre est redimensionnée
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isPortrait = screenSize <= 505;
    const year = new Date().getFullYear()
    const version = "1.0.0"

    return (

        <footer>
            {!isPortrait &&
                <div className='footer_bloc'>
                    <div className='footer_bloc_haut_landscape'>
                        <div className='footer_logo_container'>
                            <img src="../../../public/logo/Logo_MAX_blanc.webp" alt="logo MAX blanc" />
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
                            <img src="../../../public/icones/Swap_user.webp" alt="Change d'utilisateur" />
                        </div>
                        <div className='user_avatar container'>
                            <img src="../../../public/icones/No_gender.webp" alt="femme et homme" />
                        </div>
                        <div className='add_user_logo container'>
                            <img src="../../../public/icones/Add_user.webp" alt="Ajoute un utilisateur" />
                        </div>


                    </div>
                    <div className='footer_bloc_bas_portrait'>
                    <div className='france_connect_logo container'>
                            <img src="../../../public/logo/France_connect_logo.webp" alt="france connect" />
                        </div>
                        <div className='user_name container'>
                            <p>Undefined</p>
                        </div>
                        <div className='settings_logo container'>
                            <img src='../../../public/icones/Settings.webp' />
                        </div>
                    </div>
                </div>
            }

        </footer>
    )

}