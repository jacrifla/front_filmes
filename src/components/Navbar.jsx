import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeNavbar = () => {
    const navbar = document.getElementById('navbarContent');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top">
      <Link className="navbar-brand" to="/">
        CineExplore
      </Link>

      {/* Botão do colapso no mobile */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Conteúdo colapsável */}
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto">
          {user && (
            <>
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Filmes
              </Link>
              <Link className="nav-link" to="/series" onClick={closeNavbar}>
                Series
              </Link>
              <Link className="nav-link" to="/library" onClick={closeNavbar}>
                Biblioteca
              </Link>
              <Link className="nav-link" to="/profile" onClick={closeNavbar}>
                Perfil
              </Link>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <li className="nav-item d-flex align-items-center me-2">
                <span className="navbar-text text-light">
                  Olá, {user.name} 👋
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login" onClick={closeNavbar}>Entrar</Link>
              <Link className="nav-link" to="/register" onClick={closeNavbar}>Cadastrar</Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
