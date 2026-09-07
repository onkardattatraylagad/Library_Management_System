import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getUsersByRole } from '../services/userService';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getUsersByRole('STUDENT');
        setStudents(response.data || []);
      } catch (error) {
        console.error('Failed to load students', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="content-stack">
      <div className="card">
        <h2>Students</h2>
      </div>
      <div className="table-wrap card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
