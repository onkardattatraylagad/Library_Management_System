import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const response = await login(credentials);
      localStorage.setItem('libraryAuth', JSON.stringify(response.data));
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Invalid admin ID or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <form className="card form-card login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Library Portal</p>
        <h1>Admin sign in</h1>
        <p>Sign in to manage students, books, and lending.</p>
        <div className="form-grid single-column">
          <label>Admin ID<input required value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} /></label>
          <label>Password<input required type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} /></label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="primary-button" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in'}</button>
        <small>Default admin credentials: root / root</small>
      </form>
    </main>
  );
}
