import React from 'react';
import axios from 'axios';

const EditStudent = ({ student, students, setStudents, params, setParams }) => {
    const deleteStudent = async({ target }) => {
        await axios.delete(`/api/students/${ target.id }`);
        setParams('#view=landing');
        setStudents(students.filter( student => student.id !== target.id ));
    };

    return (
        <div>
            { student.name }
            <input id = { student.id } type = 'button' value = 'X' onClick = { deleteStudent }/>
        </div>
    )
};

export default EditStudent;