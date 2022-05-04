import { useNavigate } from "react-router-dom"

const Navbar = () => {

    return <>
        <header className="navbar_container">
            <nav className="navbar">
                <h1 style={{cursor: 'pointer'}} onClick={() => window.location = '/'}>Pokedex</h1>
            </nav>
        </header>
    </>
}

export default Navbar