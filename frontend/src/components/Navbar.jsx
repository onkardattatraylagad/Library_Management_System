import { useNavigate } from 'react-router-dom';

export default function Navbar({ title }) {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem('libraryAuth'); navigate('/login', { replace: true }); };
  return <header className="navbar"><div><p className="eyebrow">Library Portal</p><h1>{title}</h1></div><div className="nav-actions"><span className="admin-label">Admin: root</span><button className="ghost-button" onClick={logout}>Sign out</button></div></header>;
}
