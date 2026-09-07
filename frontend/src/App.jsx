import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Students from './pages/Students';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <Navbar title="Dashboard" />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/add" element={<AddBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/students" element={<Students />} />
            <Route path="/issues" element={<IssueBook />} />
            <Route path="/returns" element={<ReturnBook />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
