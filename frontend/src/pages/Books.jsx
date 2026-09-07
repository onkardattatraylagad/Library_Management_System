import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookTable from '../components/BookTable';
import Loading from '../components/Loading';
import { deleteBook, getBooks, searchBooks } from '../services/bookService';

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data || []);
    } catch (error) {
      console.error('Error fetching books', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    try {
      const response = await searchBooks(value);
      setBooks(response.data || []);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return;
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="content-stack">
      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title, author, category or ISBN"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="primary-button" onClick={() => navigate('/books/add')}>
          Add Book
        </button>
      </div>

      <BookTable books={books} onEdit={(id) => navigate(`/books/edit/${id}`)} onDelete={handleDelete} />
    </div>
  );
}
