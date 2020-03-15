import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;

const Unenrolled = ({ students, unenrolledStudents, setUnenrolledStudents, schools, setParams, setError, setCurrentStudent }) => {
    const [schoolIdList, setSchoolIdList] = useState([]);
    
    const updateStudent = async(student, idx) => {
        try{
            await axios.put(`/api/students/${ student.id }`, { schoolId : schoolIdList[idx] });
            schoolIdUpdate(schoolIdList[idx], idx);
            unenrolledUpdate();
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } - ${ error.statusText }`);
        }
    };

    const schoolIdUpdate = (id, idx) => {
        const newIdList = students.map((student, i) => {
            return idx === i ? id : student.schoolId;
        });
        setSchoolIdList([...newIdList]);
    };

    const unenrolledUpdate = () => {
        console.log('unenrolled:', unenrolledStudents, students, schoolIdList)
        const newStudentList = students.filter(student => !student.schoolId);
        setUnenrolledStudents([...newStudentList]);
    };
    
    console.log('immediately called Unenrolled List:', unenrolledStudents);
    return (
        <div>
            <h3>Unenrolled Students</h3>
            <ul>{
                unenrolledStudents.map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>
                            <a href = { `#view=edit_student&id=${ student.id }` } className = 'spaced' onClick = { ({ target }) => { setCurrentStudent(student); setParams(`#view=edit_student&id=${ student.id }`); } }>{ student.name }</a>
                            <form value = { student.schoolId || 'null' } className = 'spaced' onSubmit = { ev => { event.preventDefault(); updateStudent(student, idx)} }>
                                <select value = { schoolIdList[idx] || 'null' } onChange = { ({ target }) => schoolIdUpdate(target[target.selectedIndex].value, idx) }>
                                    <option value = { 'null' } key = { 'default' }>-- none --</option>
                                    {
                                        schools.map((school, idx) => {
                                            return (
                                                <option value = { school.id } key = { idx }>{ school.name }</option>
                                            )
                                        })
                                    }
                                </select>
                                <input id = { student.id } type = 'submit' value = 'Enroll'/>
                            </form>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Unenrolled;