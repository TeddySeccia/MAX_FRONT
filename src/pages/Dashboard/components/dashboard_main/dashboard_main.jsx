import AgendaBlock from '../agendaBlock/agendaBlock.jsx';
import ContextBlock from '../contextBlock/contextBlock.jsx'
import CategoryBlock from "../categoryBlock/categoryBlock.jsx";
import "./dashboard_main.css"

export default function Main() {
    
    return (

        <main>
                <div className="main_wrapper">
                    <AgendaBlock />
                    <ContextBlock />
                    <CategoryBlock />
                </div>
            </main>
    )}