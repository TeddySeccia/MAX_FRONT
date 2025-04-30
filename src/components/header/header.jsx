import './header.css';
import { useModal } from "../../hooks/useModal"
import { Button } from "../../components/button/button.jsx";
import { LogoutModal } from "../../components/modal/modal";


export default function Header() {
    const { activeModal, openModal, closeModal } = useModal();
    return (
        <header>
            <div className='header_wrapper'>
                <nav>
                    <ul>
                        <li>
                            <Button className="logout" variant="dashboard_button" description="Vous avez déjà un compte "  icon="../../../public/icones/nav/logout.webp" onClick={() => openModal("logout")} />
                            <LogoutModal isOpen={activeModal === "logout"} onClose={closeModal} isDesktop={true} />
                        </li>
                        <li>
                            <Button className="logout" variant="dashboard_button" description="Vous avez déjà un compte " icon="../../../public/icones/nav/Param.webp"  onClick={() => openModal("logout")} />
                            <LogoutModal isOpen={activeModal === "logout"} onClose={closeModal} isDesktop={true} />
                        </li>
                        <li>
                            <Button className="logout" variant="dashboard_button" description="Vous avez déjà un compte " icon="../../../public/icones/nav/menu.webp" onClick={() => openModal("logout")} />
                            <LogoutModal isOpen={activeModal === "logout"} onClose={closeModal} isDesktop={true} />
                        </li>
                        <li>
                            <Button className="logout" variant="dashboard_button" description="Vous avez déjà un compte " icon="../../../public/icones/nav/find.webp" onClick={() => openModal("logout")} />
                            <LogoutModal isOpen={activeModal === "logout"} onClose={closeModal} isDesktop={true} />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}