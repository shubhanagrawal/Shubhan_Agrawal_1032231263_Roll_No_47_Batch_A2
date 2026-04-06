import React, { useState } from 'react';
import './index.css';
import AddStudent from './components/AddStudent';
import ViewStudents from './components/ViewStudents';

function App() {
  const [activeTab, setActiveTab] = useState('view');
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setActiveTab('edit');
  };

  const handleSuccess = () => {
    setEditingStudent(null);
    setActiveTab('view');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Student Portfolio</h1>
        <p>Premium MERN Stack Application</p>
      </div>

      <div className="nav-tabs">
        <button 
          className={activeTab === 'view' ? 'active' : ''} 
          onClick={() => { setActiveTab('view'); setEditingStudent(null); }}
        >
          View Database
        </button>
        <button 
          className={activeTab === 'add' ? 'active' : ''} 
          onClick={() => { setActiveTab('add'); setEditingStudent(null); }}
        >
          Add Student
        </button>
      </div>

      <div className="glass-panel">
        {activeTab === 'view' && <ViewStudents onEdit={handleEdit} />}
        {activeTab === 'add' && <AddStudent onSuccess={handleSuccess} />}
        {activeTab === 'edit' && editingStudent && (
          <AddStudent 
            initialData={editingStudent} 
            onSuccess={handleSuccess} 
            isEditing={true} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
