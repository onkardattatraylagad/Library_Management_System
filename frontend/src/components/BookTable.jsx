export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="table-wrap card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Total</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.isbn}</td>
              <td>{book.totalQuantity}</td>
              <td>{book.availableQuantity}</td>
              <td className="action-cell">
                <button className="small-button secondary" onClick={() => onEdit(book.id)}>
                  Edit
                </button>
                <button className="small-button danger" onClick={() => onDelete(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
