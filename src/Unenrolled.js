import React from 'react';
import axios from 'axios';

const Unenrolled = ({ students, setStudents }) => {
    const deleteStudent = async({ target }) => {
        await axios.delete(`/api/students/${ target.id }`);
        setStudents(students.filter( student => student.id !== target.id ));
    };
    const updateStudent = async({ target }) => {
        await axios.put(`/api/students/${ target.id }`);
    };
    return (
        <div>
            <h3>Unenrolled Students</h3>
            <ul>{
                students.filter(student => !student.schoolId).map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>{ student.name }<input id = { student.id } type = 'button' value = 'X' onClick = { deleteStudent }/></li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Unenrolled;