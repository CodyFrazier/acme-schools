import React from 'react';
import Axios from 'axios';
const { useState } = React;

const CreateSchool = ({ schools, setSchools, setError }) => {
    const [name, setName] = useState('');

    const submitSchool = async({ target }) => {
        event.preventDefault();
        try{
            const created = (await Axios.post('/api/schools', { name })).data;
            setSchools([...schools, created]);
            setName('');
            setError('');
        }catch(ex){
            const error = ex.response;
            setError(`Code ${ error.status } - ${ error.statusText }`);
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