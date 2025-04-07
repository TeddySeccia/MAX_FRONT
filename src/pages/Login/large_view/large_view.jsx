
import { Button } from "../../../components/button/button";
import { useModal } from "../../../hooks/useModal"
import { LoginModal, RegisterModal } from "../../../components/modal/modal";





export default function LargeView({ imagePath }) {

    const { activeModal, openModal, closeModal } = useModal();


    return <div className='large_container'>
        <img src={imagePath} className="bg" alt="Image de fond" />


        <div className="overlay"></div>
        <section className='log_section'>
            <h2> Ici, vous accédez à votre <strong>compte Max</strong></h2>
            <p>Gérez vos factures, planifiez vos dépenses, envoyez des documents administratifs en un clin d'œil...</p>
            <div className='buttons'>
                <div>
                    <p>Vous avez déjà un <strong>compte Max</strong></p>
                    <Button className="log_buttons" text="Connexion" description="Vous avez déjà un compte Max" onClick={() => openModal("login")} />
                    <LoginModal isOpen={activeModal === "login"} onClose={closeModal} isDesktop={true} />
                    
                </div>

                <hr />
                <div>
                    <p>Vous n'avez pas de <strong>compte Max</strong></p>
                    <Button className="log_buttons" text="Inscription" description="Vous n'avez pas encore de compte Max" onClick={() => openModal("register")} />
                    <RegisterModal isOpen={activeModal === "register"} onClose={closeModal} />
                </div>

            </div>
        </section>
    </div>
    

};