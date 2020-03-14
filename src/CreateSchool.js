import React from 'react';
import Axios from 'axios';
const { useState } = React;

const CreateSchool = ({ schools, setSchools, setError, params, setParams }) => {
    const [name, setName] = useState('');

    const submitSchool = async({ target }) => {
        event.preventDefault();
        try{
            const created = (await Axios.post('/api/schools', { name })).data;
            setSchools([...schools, created]);
            setName('');
            setError('');
        }catch(ex){
            setError(ex.response.data.message);
        }
        
    };

    return (
        <form className = 'columnNW' onSubmit = { submitSchool }>
            <h2>Create School</h2>
            <input id = 'schoolVal' placeholder = 'Name of New School...' value = { name } onChange = { ev => setName(ev.target.value) } />
            <input type = 'submit' />
        </form>
    )
};

export default CreateSchool;