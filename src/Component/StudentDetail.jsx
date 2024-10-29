
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './StudentDetail.css';

const StudentDetail = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await fetch(`https://student-api-nestjs.onrender.com/students/${id}`);
                const data = await response.json();
                setStudent(data.data); // Assuming data structure matches
            } catch (error) {
                console.error("Error fetching student detail:", error);
            }
        };

        fetchStudentDetail();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

     return (
        <div className="student-detail-container">
            <h2 className="student-detail-header">{student.name}</h2>
            <div className="student-detail-content">
                <p>
                    <span className="student-detail-label">Student Code:</span> {student.studentCode}
                </p>
                <p>
                    <span className="student-detail-label">Status:</span> 
                    <span className={student.isActive ? 'status-active' : 'status-inactive'}>
                        {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                </p>
                {/* Add more fields if needed */}
            </div>
        </div>
    );
};

export default StudentDetail;