import React from 'react';
import axios from 'axios';
import CreateSchool from './CreateSchool.js';
import CreateStudent from './CreateStudent.js';
import SchoolList from './SchoolList.js';
import Unenrolled from './Unenrolled.js';
const { useEffect, useState } = React;

const App = () => {
    const [schools, setSchools] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get('api/schools'),
            axios.get('api/students')
        ])
        .then(responses => responses.map( response => response.data))
        .then( results => {
            setSchools(results[0]);
            setStudents(results[1]);
        })
        .catch( ex => setError(ex.response.data.message));
    }, []);

    return (
        <main>
            <h1>Acme Schools</h1>
            <section id = 'forms'>
                <CreateSchool />
                <CreateStudent /> 
            </section>
            <section id = 'enrollment'>
                <div id = 'unenrolled'>
                    <Unenrolled />
                </div>
                <ul id = 'schoolList'>{
                    schools.map((school, idx) => {
                        console.log(school)
                        return (
                            <li class = 'school' key = { idx }><SchoolList school = { school }/></li>
                        )
                    })
                }</ul>
            </section>
        </main>
    )
};

export default App;