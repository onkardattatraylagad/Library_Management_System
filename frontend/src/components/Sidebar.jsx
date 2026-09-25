import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/books', label: 'Books' },
  { to: '/books/add', label: 'Add Book' },
  { to: '/students', label: 'Students' },
  { to: '/students/add', label: 'Add Student' },
  { to: '/issues', label: 'Issue Book' },
  { to: '/returns', label: 'Return Book' }
];

export default function Sidebar() {
  return <aside className="sidebar"><div className="brand-box"><h2>Library</h2></div><nav className="sidebar-nav">{navItems.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{item.label}</NavLink>)}</nav></aside>;
}
