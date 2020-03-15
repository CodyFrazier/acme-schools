import React from 'react';
import axios from 'axios';
const { useState } = React;

const EditStudent = ({ student, students, setStudents, setError, setParams }) => {
    const [studentName, setStudentName] = useState('');
    const [currentName, setCurrentName] = useState(student.name);

    const updateStudentName = async({ target }) => {
        event.preventDefault();
        try{
            await axios.put(`/api/students/${ student.id }`, { name : studentName });
            setCurrentName(studentName);
            setStudentName('');
            setError('');
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } = ${ error.statusText }`);
        }
    };

    const deleteStudent = async({ target }) => {
        try{
            await axios.delete(`/api/students/${ target.id }`);
            setParams('#view=landing');
            setStudents(students.filter( student => student.id !== target.id ));
            setError('');
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } - ${ error.statusText }`);
        }
    };

    return (
        <form onSubmit = { updateStudentName }>
            <h3>{ currentName }</h3>
            <div>
                <input placeholder = 'New Name of Student...' value = { studentName } onChange = { ({ target }) => setStudentName(target.value) }/>
                <input type = 'submit' value = 'Change Student Name'/>
            </div>
            <input id = { student.id } type = 'button' value = 'X' onClick = { deleteStudent }/>
        </form>
    )
};

export default EditStudent;