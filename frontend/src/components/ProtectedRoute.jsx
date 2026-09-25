import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(() => Boolean(localStorage.getItem('libraryAuth')));

  useEffect(() => {
    const syncAuth = () => setAuthenticated(Boolean(localStorage.getItem('libraryAuth')));
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
