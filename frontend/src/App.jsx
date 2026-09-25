import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import Login from './pages/Login';

function LibraryLayout() {
  return <div className="app-shell"><Sidebar /><main className="main-panel"><Navbar title="Library Management" /><div className="page-content"><OutletRoutes /></div></main></div>;
}

function OutletRoutes() {
  return <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/books" element={<Books />} />
    <Route path="/books/add" element={<AddBook />} />
    <Route path="/books/edit/:id" element={<EditBook />} />
    <Route path="/students" element={<Students />} />
    <Route path="/students/add" element={<AddStudent />} />
    <Route path="/issues" element={<IssueBook />} />
    <Route path="/returns" element={<ReturnBook />} />
  </Routes>;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="*" element={<LibraryLayout />} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
  </Routes>;
}
