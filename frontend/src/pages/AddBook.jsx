import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { createBook } from '../services/bookService';

export default function AddBook() {
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    try {
      await createBook(payload);
      navigate('/books');
    } catch (error) {
      console.error('Add book failed', error);
      window.alert(error.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div className="content-stack">
      <h2>Add New Book</h2>
      <BookForm onSubmit={handleSubmit} submitLabel="Save Book" />
    </div>
  );
}
