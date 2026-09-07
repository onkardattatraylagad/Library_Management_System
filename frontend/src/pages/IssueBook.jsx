import { useEffect, useState } from 'react';
import IssueBookForm from '../components/IssueBookForm';
import Loading from '../components/Loading';
import { getBooks } from '../services/bookService';
import { issueBook } from '../services/issueService';
import { getUsersByRole } from '../services/userService';

export default function IssueBook() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentResponse, bookResponse] = await Promise.all([
          getUsersByRole('STUDENT'),
          getBooks()
        ]);
        setUsers(studentResponse.data || []);
        setBooks((bookResponse.data || []).filter((book) => book.availableQuantity > 0));
      } catch (error) {
        console.error('Failed to load issue form data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (payload) => {
    try {
      const response = await issueBook(payload);
      window.alert(`Book issued successfully. Issue ID: ${response.data.issueId}`);
      window.location.reload();
    } catch (error) {
      console.error('Issue failed', error);
      window.alert(error.response?.data?.message || 'Unable to issue book');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="content-stack">
      <h2>Issue Book</h2>
      <IssueBookForm users={users} books={books} onSubmit={handleSubmit} />
    </div>
  );
}
