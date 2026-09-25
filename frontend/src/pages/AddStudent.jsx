import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

export default function AddStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: 'student123' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    try {
      await createUser({ ...form, role: 'STUDENT' });
      setMessage('Student added successfully.');
      setForm({ name: '', email: '', password: 'student123' });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add student.');
    }
  };

  return <div className="content-stack">
    <div className="card"><h2>Add Student</h2><p>Create a student account for the library.</p></div>
    <form className="card form-card" onSubmit={submit}>
      <div className="form-grid">
        <label>Student name<input name="name" required value={form.name} onChange={update} placeholder="Full name" /></label>
        <label>Email<input name="email" required type="email" value={form.email} onChange={update} placeholder="student@example.com" /></label>
        <label>Password<input name="password" required minLength="6" value={form.password} onChange={update} /></label>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <button className="primary-button">Add Student</button>
      <button type="button" className="small-button secondary" onClick={() => navigate('/students')}>View Students</button>
    </form>
  </div>;
}
