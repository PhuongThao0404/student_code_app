// src/components/StudentTable.jsx
import React from 'react';
import { Table, Badge, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentTable = ({ students, handleSelect, handleDelete }) => {
  return (
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
        {(Array.isArray(students) ? students : []).map((student, index) => (
          <tr key={student.id}> {/* Sử dụng student.id thay vì index */}
            <td>
              <Form.Check
                type="checkbox"
                checked={student.selected}
                onChange={() => handleSelect(index)}
              />
            </td>
            <td>
              <Link to={`/student/${student.id}`}>{student.name}</Link>
            </td>
            <td>{student.studentCode}</td>
            <td>
              <Badge bg={student.isActive ? 'success' : 'danger'}>
                {student.active ? 'Active' : 'Inactive'}
              </Badge>
            </td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(student.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentTable;
