import React from 'react';
import axios from 'axios';
import qs from 'qs';

const SchoolList = ({ school, students, setStudents, setError, params, setParams, setCurrentSchool }) => {
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
            <a href = { `#view=edit_school&id=${ school.id }` } className = 'spaced' onClick = { ({ target }) => { setCurrentSchool(school); setParams(`#view=edit_school&id=${ school.id }`); } }><h2>{ school.name }</h2></a>
            <ul className = 'studentList'>{
                students.filter(student => student.schoolId === school.id).map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>
                            <a href = { `#view=edit_student&id=${ student.id }` } onClick = { ({ target }) => { setCurrentStudent(student); setParams(`#view=edit_student&id=${ student.id }`)} }>{ student.name }</a>
                            <input id = { student.id } type = 'button' value = 'Unenroll' onClick = { unenrollStudent }/>
                        </li>
                    )
                })
            }</ul>
        </div>
        
    )
};

export default SchoolList;