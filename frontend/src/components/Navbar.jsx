import React from 'react';

export default function Navbar({ title }) {
  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Library Portal</p>
        <h1>{title}</h1>
      </div>
      <div className="nav-actions">
        <button className="ghost-button">Admin Access</button>
      </div>
    </header>
  );
}
