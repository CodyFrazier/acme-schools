const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_schools');

client.connect();

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS students;
        DROP TABLE IF EXISTS schools;
        CREATE TABLE IF NOT EXISTS schools(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(200) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );
        CREATE TABLE IF NOT EXISTS students(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(50) NOT NULL,
            "schoolId" UUID REFERENCES schools(id) ON DELETE CASCADE,
            CHECK (char_length(name) > 0)
        );
    `;
    client.query(SQL);
    const [NYU, BYU, UCB, Toudai, CDU] = await Promise.all([
        createItem('schools', {name: 'NYU'}),
        createItem('schools', {name: 'BYU'}),
        createItem('schools', {name: 'UCB'}),
        createItem('schools', {name: 'Toudai'}),
        createItem('schools', {name: 'CDU'}),
        createItem('students', {name: 'Billard Valerius'}),
        createItem('students', {name: 'Ootani Kou'}),
        createItem('students', {name: 'Yote Patel'}),
        createItem('students', {name: 'Meghan Tullman'})
    ]);
};

const createItem = async(table, item) => {
    console.log(item.schoolId)
    const itemArr = item.schoolId ? [item.name, item.schoolId] : [item.name];
    const SQL = `INSERT INTO ${ table } (name${ item.schoolId ? ', "schoolId"' : '' }) values ($1${ item.schoolId ? ', $2' : '' }) returning *`;
    return (await client.query(SQL, itemArr)).rows[0];
};

const deleteItem = async(table, id) => {
    const SQL = `DELETE FROM ${ table } WHERE id = ($1)`;
    return (await client.query(SQL, [id])).rows[0];
};

const readTable = async(table) => {
    const SQL = `SELECT * FROM ${ table }`;
    return (await client.query(SQL)).rows;
};

const updateTable = async(table, id, item) => {
    let SQL = '';
    if(table === 'students'){
        if(item.schoolId !== undefined && item.name !== undefined){
            SQL = `UPDATE ${ table } SET "schoolId" = ($1), name = ($2) WHERE id = ($3) RETURNING *;`;
            return (await client.query(SQL, [item.schooId, item.name, id]));
        }else if(item.schoolId !== undefined){
            SQL = `UPDATE ${ table } SET "schoolId" = ($1) WHERE id = ($2) RETURNING *;`;
            return (await client.query(SQL, [item.schoolId, id]));
        }else if(item.name !== undefined){
            SQL = `UPDATE ${ table } SET name = ($1) WHERE id = ($2) RETURNING *;`;
            return (await client.query(SQL, [item.name, id]));
        }else{
            return 'No Update Was Requested';
        }
    }else if(table === 'schools'){
        const SQL = `UPDATE ${ table } SET name = ($1) WHERE id = ($2);`
        return (await client.query(SQL, [item.name, id]));
    }
};

module.exports = {
    sync,
    createItem,
    deleteItem,
    updateTable,
    readTable
};