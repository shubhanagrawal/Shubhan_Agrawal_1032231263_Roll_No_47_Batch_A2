import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/student';

function AddStudent({ initialData, onSuccess, isEditing }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: ''
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setStudent({
        name: initialData.name,
        email: initialData.email,
        course: initialData.course
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/update/${initialData._id}`, student);
      } else {
        await axios.post(`${API_URL}/add`, student);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving student", error);
      alert("Failed to save student details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
        {isEditing ? 'Update Student Record' : 'Register New Student'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={student.name} 
            onChange={handleChange} 
            placeholder="e.g. Jane Doe"
            required 
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={student.email} 
            onChange={handleChange} 
            placeholder="e.g. jane@university.edu"
            required 
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input 
            type="text" 
            name="course" 
            value={student.course} 
            onChange={handleChange} 
            placeholder="e.g. Computer Science"
            required 
          />
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Processing...' : isEditing ? 'Update Student' : 'Save Student Record'}
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
