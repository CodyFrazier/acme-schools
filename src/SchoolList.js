import React from 'react';
import axios from 'axios';

const SchoolList = ({ school, students, setStudents, setError }) => {
    const unenrollStudent = async({ target }) => {
        try{
            await (axios.put(`/api/students/${ target.id }`, { schoolId : null }));
            setStudents([...students]);
            setError('');
        }catch(ex){
            setError(ex.response.data.message);
        }
    };
    return (
        <div>
            <h2>{ school.name }</h2>
            <ul className = 'studentList'>{
                students.filter(student => student.schoolId === school.id).map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>
                            { student.name }
                            <input id = { student.id } type = 'button' value = 'Unenroll' onClick = { unenrollStudent }/>
                        </li>
                    )
                })
            }</ul>
        </div>
        
    )
};

export default SchoolList;