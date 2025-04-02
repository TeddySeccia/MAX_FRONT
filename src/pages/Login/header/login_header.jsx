import './login_header.css'
import data from '../../../datas/login_header.js'


export default function Login_header() {

    const randomEntry = data[Math.floor(Math.random() * data.length)];

    return (
        <header>
            <div className="logo_container">
                <img src="../public/logo/Logo_MAX.webp" className="logo" alt="MAX icon" />
            </div>
            <hr />
            <h1>{randomEntry.text}</h1>
        </header>
    )
}