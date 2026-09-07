import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getBooks } from '../services/bookService';
import { getDashboardSummary } from '../services/dashboardService';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [dashboardResponse, booksResponse] = await Promise.all([
          getDashboardSummary(),
          getBooks()
        ]);
        setSummary(dashboardResponse.data);
        setBooks(booksResponse.data || []);
      } catch (error) {
        console.error('Dashboard fetch failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

  const recentBooks = [...books].slice(-4).reverse();

  return (
    <div className="content-stack">
      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Books</span>
          <strong>{summary?.totalBooks ?? 0}</strong>
        </div>
        <div className="stat-card">
          <span>Available</span>
          <strong>{summary?.totalAvailableBooks ?? 0}</strong>
        </div>
        <div className="stat-card">
          <span>Issued</span>
          <strong>{summary?.totalIssuedBooks ?? 0}</strong>
        </div>
        <div className="stat-card">
          <span>Students</span>
          <strong>{summary?.totalStudents ?? 0}</strong>
        </div>
        <div className="stat-card">
          <span>Admins</span>
          <strong>{summary?.totalAdmins ?? 0}</strong>
        </div>
      </div>

      <div className="dashboard-panels">
        <div className="card">
          <h3>Recent Books</h3>
          <ul className="list-layout">
            {recentBooks.map((book) => (
              <li key={book.id}>
                <div>
                  <strong>{book.title}</strong>
                  <small>{book.author}</small>
                </div>
                <span>{book.availableQuantity} left</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Quick Overview</h3>
          <ul className="list-layout compact">
            <li>
              <div>
                <strong>Book Availability</strong>
              </div>
              <span>{summary?.totalAvailableBooks ?? 0} copies</span>
            </li>
            <li>
              <div>
                <strong>Active Loans</strong>
              </div>
              <span>{summary?.totalIssuedBooks ?? 0} issued</span>
            </li>
            <li>
              <div>
                <strong>Student Count</strong>
              </div>
              <span>{summary?.totalStudents ?? 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
