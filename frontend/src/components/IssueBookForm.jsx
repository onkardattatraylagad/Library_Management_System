import { useState } from 'react';

const emptyForm = {
  userId: '',
  bookId: '',
  dueDate: ''
};

export default function IssueBookForm({ users, books, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      userId: Number(form.userId),
      bookId: Number(form.bookId),
      dueDate: form.dueDate
    });
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Student</span>
          <select name="userId" value={form.userId} onChange={handleChange} required>
            <option value="">Select student</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Book</span>
          <select name="bookId" value={form.bookId} onChange={handleChange} required>
            <option value="">Select book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} - {book.availableQuantity} available
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Due Date</span>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        </label>
      </div>

      <button type="submit" className="primary-button">Issue Book</button>
    </form>
  );
}
