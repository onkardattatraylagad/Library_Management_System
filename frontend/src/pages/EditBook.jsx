import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import Loading from '../components/Loading';
import { getBookById, updateBook } from '../services/bookService';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await getBookById(id);
        setInitialData(response.data);
      } catch (error) {
        console.error('Failed to load book', error);
      }
    };

    loadBook();
  }, [id]);

  const handleSubmit = async (payload) => {
    try {
      await updateBook(id, payload);
      navigate('/books');
    } catch (error) {
      console.error('Update book failed', error);
      window.alert(error.response?.data?.message || 'Failed to update book');
    }
  };

  if (!initialData) return <Loading />;

  return (
    <div className="content-stack">
      <h2>Edit Book</h2>
      <BookForm initialData={initialData} onSubmit={handleSubmit} submitLabel="Update Book" />
    </div>
  );
}
