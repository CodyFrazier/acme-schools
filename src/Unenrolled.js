import React from 'react';
import axios from 'axios';
const { useState, useEffect } = React;

const Unenrolled = ({ students, setStudents, schools, params, setParams, setCurrentStudent }) => {
    const [schoolIdList, setSchoolIdList] = useState([]);
    const [unenrolledCount, setUnenrolledCount] = useState(0);

    const updateStudent = async(student, idx) => {
        await axios.put(`/api/students/${ student.id }`, { schoolId : schoolIdList[idx] });
        listUpdate(schoolIdList[idx], idx);
    };

    const listUpdate = (id, idx) => {
        const newList = students.map((student, i) => {
            return idx === i ? id : student.schoolId;
        });
        setSchoolIdList([...newList]);
        setUnenrolledCount(findUnenrolled());
        console.log(unenrolledCount);
    };
    const findUnenrolled = () => {
        return students.reduce((acc, student) => {
            return !student.schoolId ? acc++ : acc;
        }, 0);
    };

    useEffect(() => {
        setUnenrolledCount(findUnenrolled());
        console.log(unenrolledCount);
    }, []);
    return (
        <div>
            <h3>Unenrolled Students</h3>
            <ul>{
                students.filter(student => !student.schoolId).map((student, idx) => {
                    return (
                        <li className = 'student' key = { idx }>
                            <a href = { `#view=edit_student&id=${ student.id }` } className = 'spaced' onClick = { ({ target }) => { setCurrentStudent(student); setParams(`#view=edit_student&id=${ student.id }`); } }>{ student.name }</a>
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
                            </form>
                        </li>
                    )
                })
            }</ul>
        </div>
    )
};

export default Unenrolled;