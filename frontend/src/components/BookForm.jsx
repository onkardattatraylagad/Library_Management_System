import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  author: '',
  category: '',
  isbn: '',
  totalQuantity: 1,
  availableQuantity: 1
};

export default function BookForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState(initialData || emptyForm);

  useEffect(() => {
    setForm(initialData || emptyForm);
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'totalQuantity' || name === 'availableQuantity' ? Number(value) : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Title</span>
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          <span>Author</span>
          <input name="author" value={form.author} onChange={handleChange} required />
        </label>

        <label>
          <span>Category</span>
          <input name="category" value={form.category} onChange={handleChange} required />
        </label>

        <label>
          <span>ISBN</span>
          <input name="isbn" value={form.isbn} onChange={handleChange} required />
        </label>

        <label>
          <span>Total Quantity</span>
          <input
            type="number"
            name="totalQuantity"
            min="0"
            value={form.totalQuantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>Available Quantity</span>
          <input
            type="number"
            name="availableQuantity"
            min="0"
            value={form.availableQuantity}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button type="submit" className="primary-button">{submitLabel}</button>
    </form>
  );
}
