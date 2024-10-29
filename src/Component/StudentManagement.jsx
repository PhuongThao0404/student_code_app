// src/components/StudentManagement.jsx
import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [totalSelected, setTotalSelected] = useState(0);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://student-api-nestjs.onrender.com/students");
        const data = await response.json();
        const transformedData = data.data.map((std) => ({
          id: std._id,
          name: std.name,
          studentCode: std.studentCode,
          isActive: std.isActive,
        }));
        setStudents(transformedData || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleAddOrUpdateStudent = async () => {
    if (editingStudentId) {
      await handleUpdateStudent(editingStudentId, {
        name: studentName,
        code: studentCode,
        active: isActive,
      });
    } else {
      const newStudent = {
        name: studentName,
        code: studentCode,
        active: isActive,
      };
      try {
        const response = await fetch('https://student-api-nestjs.onrender.com/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newStudent),
        });
        if (response.ok) {
          const addedStudent = await response.json();
          setStudents([addedStudent, ...students]);
          setStudentName('');
          setStudentCode('');
          setIsActive(false);
        }
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  const handleUpdateStudent = async (id, updatedData) => {
    try {
      const response = await fetch(`https://student-api-nestjs.onrender.com/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(students.map(student => (student.id === id ? updatedStudent : student)));
        setStudentName('');
        setStudentCode('');
        setIsActive(false);
        setEditingStudentId(null); 
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://student-api-nestjs.onrender.com/students/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents(students.filter(student => student.id !== id));
      } 
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSelect = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, selected: !student.selected } : student
    );
    setStudents(updatedStudents);
    const newSelectedCount = updatedStudents.filter(s => s.selected).length;
    setTotalSelected(newSelectedCount);
  };

  const handleClear = () => {
    setStudents([]);
    setTotalSelected(0);
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-3">Student Management</h3>
              <h5 className="text-center text-info">
                Total Selected Student: <strong>{totalSelected}</strong>
              </h5>
              <div className="d-flex justify-content-end">
                <Button variant="outline-danger" onClick={handleClear}>
                  Clear All
                </Button>
              </div>

              <StudentForm 
                studentName={studentName} 
                setStudentName={setStudentName} 
                studentCode={studentCode} 
                setStudentCode={setStudentCode} 
                isActive={isActive} 
                setIsActive={setIsActive} 
                handleAddOrUpdateStudent={handleAddOrUpdateStudent} 
                editingStudentId={editingStudentId}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={10} className="mt-4">
          <Card className="shadow">
            <Card.Body>
              <h4 className="text-center mb-4">Student List</h4>
              <StudentTable 
                students={students} 
                handleSelect={handleSelect} 
                handleDelete={handleDelete}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentManagement;
