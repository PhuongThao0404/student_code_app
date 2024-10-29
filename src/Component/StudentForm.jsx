// src/components/StudentForm.jsx
import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const StudentForm = ({
  studentName,
  setStudentName,
  studentCode,
  setStudentCode,
  isActive,
  setIsActive,
  handleAddOrUpdateStudent,
  editingStudentId
}) => {
  return (
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
        <Button variant="primary" onClick={handleAddOrUpdateStudent}>
          {editingStudentId ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </Form>
  );
};

export default StudentForm;
