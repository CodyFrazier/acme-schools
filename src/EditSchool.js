import React from 'react';
import axios from 'axios';

const EditSchool = ({ school, schools, setSchools, params, setParams }) => {
    const deleteSchool = async({ target }) => {
        await axios.delete(`/api/schools/${ target.id }`);
        setParams('#view=landing');
        setSchools(schools.filter( school => school.id !== target.id ));
    };

    return (
        <div>
            <h3>{ school.name }</h3>
            <input id = { school.id } type = 'button' value = 'X' onClick = { deleteSchool }/>
        </div>
    )
};

export default EditSchool;