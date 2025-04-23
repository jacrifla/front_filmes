import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">CineExplore</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Filmes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/library">Biblioteca</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Perfil</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {user ? (
            <>
              <span className="navbar-text me-3">Olá, {user.name} 👋</span>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Entrar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
