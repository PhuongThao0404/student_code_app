// src/App.js
import React, { useState } from 'react';
import { Button, Form, Table, Badge, Card, Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState([
    { name: 'Nguyen Van A', code: 'CODE12345', active: true, selected: false },
    { name: 'Tran Van B', code: 'CODE67890', active: false, selected: false },
  ]);
  const [studentName, setStudentName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [totalSelected, setTotalSelected] = useState(0);

  const handleAddStudent = () => {
    const newStudent = {
      name: studentName,
      code: studentCode,
      active: isActive,
      selected: false,
    };
    setStudents([newStudent, ...students]);
    setStudentName('');
    setStudentCode('');
    setIsActive(false);
  };

  const handleDelete = (index) => {
    const studentToDelete = students[index];
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);

    // If the deleted student was selected, update the total selected count
    if (studentToDelete.selected) {
      setTotalSelected(totalSelected - 1);
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
      <Row className="justify-content-center mb-4">
        <Col md={8}>
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

              <Form className="mt-3">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formStudentName">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student name"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formStudentCode">
                      <Form.Label>Student Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter student code"
                        value={studentCode}
                        onChange={(e) => setStudentCode(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formIsActive" className="my-3">
                  <Form.Check
                    type="checkbox"
                    label="Still Active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={handleAddStudent}>
                    Add Student
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="text-center mb-4">Student List</h4>
              <Table striped bordered hover responsive>
                <thead className="text-center">
                  <tr>
                    <th>Select</th>
                    <th>Student Name</th>
                    <th>Student Code</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={student.selected}
                          onChange={() => handleSelect(index)}
                        />
                      </td>
                      <td>{student.name}</td>
                      <td>{student.code}</td>
                      <td>
                        <Badge bg={student.active ? 'success' : 'danger'}>
                          {student.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
