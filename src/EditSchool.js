import React from 'react';
import axios from 'axios';
const { useState } = React;

const EditSchool = ({ school, schools, setSchools, setParams, setError }) => {
    const [schoolName, setSchoolName] = useState('');
    const [currentName, setCurrentName] = useState(school.name)

    const updateSchoolName = async({ target }) => {
        event.preventDefault();
        try{
            await axios.put(`/api/schools/${ school.id }`, { name : schoolName });
            setCurrentName(schoolName);
            setSchoolName('');
            setError('');
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } = ${ error.statusText }`);
        }
    };
    const deleteSchool = async({ target }) => {
        try{
            await axios.delete(`/api/schools/${ target.id }`);
            setParams('#view=landing');
            setSchools(schools.filter( school => school.id !== target.id ));
            setError('');
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } - ${ error.statusText }`);
        }
    };

    return (
        <form className = 'columnNW' onSubmit = { updateSchoolName }>
            <h3>{ currentName }</h3>
            <div className = 'spaced'>
                <input id = 'schoolName' placeholder = 'Enter New School Name...' value = { schoolName } onChange = { ({target}) => setSchoolName(target.value) }/>
                <input type = 'submit' value = 'Change School Name' disabled = { schoolName.length < 3 }/>
            </div>
            <input id = { school.id } type = 'button' value = 'Delete School' onClick = { deleteSchool }/>
        </form>
    )
};

export default EditSchool;