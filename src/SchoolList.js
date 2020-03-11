import React from 'react';

const SchoolList = ({ school }) => {
    console.log(school)
    return (
        <div>
            <div>I am a school.</div>
            <div>This particular school is: { school.name }</div> 
        </div>
        
    )
};

export default SchoolList;