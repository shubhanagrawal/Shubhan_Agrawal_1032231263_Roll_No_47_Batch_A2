import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/student';

function ViewStudents({ onEdit }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/view`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        fetchStudents(); // Refresh list
      } catch (error) {
        console.error("Error deleting", error);
        alert("Failed to delete student");
      }
    }
  };

  if (loading) return <div className="loading">Loading database...</div>;
  if (students.length === 0) return <div className="empty-state">No student records found. Add one to get started!</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Active Student Records</h2>
      <div className="students-grid">
        {students.map(student => (
          <div key={student._id} className="student-card">
            <div className="student-info">
              <h3>{student.name}</h3>
              <p>{student.email}</p>
              <span className="course">{student.course}</span>
            </div>
            
            <div className="card-actions">
              <button 
                className="btn-edit" 
                onClick={() => onEdit(student)}
              >
                Edit
              </button>
              <button 
                className="btn-delete" 
                onClick={() => handleDelete(student._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewStudents;
