import { useState } from 'react';
import { returnBook } from '../services/issueService';

export default function ReturnBook() {
  const [issueId, setIssueId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await returnBook(issueId);
      window.alert(`Book returned successfully. Issue ID: ${response.data.issueId}`);
      setIssueId('');
    } catch (error) {
      console.error('Return failed', error);
      window.alert(error.response?.data?.message || 'Unable to return book');
    }
  };

  return (
    <div className="content-stack">
      <h2>Return Book</h2>
      <form className="card form-card" onSubmit={handleSubmit}>
        <label>
          <span>Issue ID</span>
          <input
            type="number"
            value={issueId}
            onChange={(event) => setIssueId(event.target.value)}
            placeholder="Enter issue ID"
            required
          />
        </label>
        <button type="submit" className="primary-button">Return Book</button>
      </form>
    </div>
  );
}
