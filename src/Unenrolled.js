import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;

const Unenrolled = ({ students, setStudents, schools }) => {
    const [schoolIdList, setSchoolIdList] = useState([]);

    const deleteStudent = async({ target }) => {
        await axios.delete(`/api/students/${ target.id }`);
        setStudents(students.filter( student => student.id !== target.id ));
    };
    const updateStudent = async(student, idx) => {
        await axios.put(`/api/students/${ student.id }`, { schoolId : schoolIdList[idx] });
        listUpdate(schoolIdList[idx], idx);
    };

    const listUpdate = (id, idx) => {
        const newList = students.map((student, i) => {
            return idx === i ? id : student.schoolId;
        });
        setSchoolIdList([...newList]);
    };

    return (
        <div>
            <h3>Unenrolled Students</h3>
            <ul>{
                students.filter(student => !student.schoolId).map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>
                            <div className = 'spaced'>{ student.name }</div>
                            <form value = { student.schoolId || 'null' } className = 'spaced' onSubmit = { ev => { event.preventDefault(); updateStudent(student, idx)} }>
                                <select value = { schoolIdList[idx] || 'null' } onChange = { ({ target }) => listUpdate(target[target.selectedIndex].value, idx) }>
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
                                <input id = { student.id } type = 'button' value = 'X' onClick = { deleteStudent }/>
                            </form>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Unenrolled;