import React from 'react';
import axios from 'axios';
import qs from 'qs';
import CreateSchool from './CreateSchool.js';
import CreateStudent from './CreateStudent.js';
import SchoolList from './SchoolList.js';
import Unenrolled from './Unenrolled.js';
import EditStudent from './EditStudent.js';
import EditSchool from './EditSchool.js';
const { useEffect, useState } = React;

//TODO:
/*
    1.                  Implement error to display when something goes wrong.

    2.                  Ensure component rerendering when updating student.schoolId

    3.                  Implement hash routing                                          CHECK

    4.                  Implement display change when editing users and schools         CHECK

    5.                  Implement school deletion                                       CHECK

    6.                  School and Student Enrollment statistics show on page
*/

const App = () => {
    const [schools, setSchools] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState([]);
    const [params, setParams] = useState(`#${ window.location.hash.slice(1) }`);
    const [currentStudent, setCurrentStudent] = useState({});
    const [currentSchool, setCurrentSchool] = useState({});

    useEffect(() => {
        window.addEventListener('hashchange', () => {
            const paramObj = qs.parse(window.location.hash.slice(1));
            console.log(`#${ qs.stringify(paramObj) }`)
            setParams(`#${ qs.stringify(paramObj) }`);
        });

        if(!['edit_student', 'edit_school', 'landing'].includes(window.location.hash.slice(1))){
            window.location.hash = 'view=landing';
        }
    }, []);
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
            <a href = { '#view=landing' } onClick = { ({ target }) => setParams('#view=landing') }><h1>Acme Schools</h1></a>
            <section id = 'forms'>
                { (params === `#${ qs.stringify({ view: 'landing' }) }` || params === `${ qs.parse('#view=landing') }`) && <CreateSchool schools = { schools } setSchools = { setSchools } setError = { setError } params = { params } setParams = { setParams }/> }
                { (params === `#${ qs.stringify({ view: 'landing' }) }` || params === `${ qs.parse('#view=landing') }`) && <CreateStudent students = { students } setStudents = { setStudents } schools = { schools } setError = { setError } params = { params } setParams = { setParams }/> }
                { (params.includes(`#${ qs.stringify( { view : 'edit_school' } ) }`) || params.includes(`#${ qs.parse('#view=edit_schools') }`)) && <EditSchool school = { currentSchool } schools = { schools } setSchools = { setSchools } params = { params } setParams = { setParams }/>}
                { (params.includes(`#${ qs.stringify( { view : 'edit_student' } ) }`) || params.includes(`#${ qs.parse('#view=edit_students') }`)) && <EditStudent student = { currentStudent } students = { students } setStudents = { setStudents } params = { params } setParams = { setParams }/> }
            </section>
            { (params === `#${ qs.stringify({ view: 'landing' }) }` || params === `${ qs.parse('#view=landing') }`) && <section id = 'enrollment'>
                <div id = 'unenrolled'>
                    <Unenrolled students = { students } setStudents = { setStudents } schools = { schools } params = { params } setParams = { setParams } setCurrentStudent = { setCurrentStudent }/>
                </div>
                <ul id = 'schoolList'>{
                    schools.map((school, idx) => {
                        return (
                            <li className = 'school' key = { idx }><SchoolList school = { school } students = { students } setStudents = { setStudents } params = { params } setParams = { setParams } setError = { setError } setCurrentSchool = { setCurrentSchool }/></li>
                        )
                    })
                }</ul>
            </section> }
        </main>
    )
};

export default App;