import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const navigate = useNavigate()
  const isLogged = !!localStorage.getItem('userToken')

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  const toggleNavbar = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to={isLogged ? "/home" : "/"}>
        🎬 CineExplore
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarContent"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarContent">
        <ul className="navbar-nav ms-auto">
          {!isLogged ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={toggleNavbar}>Filmes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={toggleNavbar}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" onClick={toggleNavbar}>Cadastrar</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/home" onClick={toggleNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/saved" onClick={toggleNavbar}>Salvos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/watched" onClick={toggleNavbar}>Assistidos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings" onClick={toggleNavbar}>Configurações</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0" onClick={handleLogout}>
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
