import React from 'react';
import axios from 'axios';
import SchoolList from './SchoolList';
const { useState } = React;

const CreateStudent = ({ students, setStudents, schools, setError }) => {
    const [name, setName] = useState('');
    const [schoolId, setSchoolId] = useState('null');

    const submitStudent = async({ target }) => {
        event.preventDefault();
        try{
            const created = (await axios.post('/api/students', { name, schoolId })).data;
            setStudents([...students, created]);
            setName('');
            setSchoolId('null');
            setError('');
        }catch(ex){
            setError(ex.response.data.message)
        }
    };
    return (
        <form className = 'columnNW' onSubmit = { submitStudent }>
            <h2>Create Student</h2>
            <input id = 'studentVal' placeholder = 'Name of New Student...' value = { name } onChange = { ev => setName(ev.target.value) }/>
            <select value = { schoolId } onChange = { ({ target }) => setSchoolId(target[target.selectedIndex].value) }>
                <option value = { 'null' } key = { 'default' }>-- none --</option>
                {
                schools.map((school, idx) => {
                    return (
                        <option value = { school.id } key = { idx }>{ school.name }</option>
                    )
                })
            }</select>
            <input type = 'submit' value = 'Submit'/>
        </form>
    )
};

export default CreateStudent;