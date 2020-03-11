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
        createSchool({name: 'NYU'}),
        createSchool({name: 'BYU'}),
        createSchool({name: 'UCB'}),
        createSchool({name: 'Toudai'}),
        createSchool({name: 'CDU'})
    ]);
};

const createSchool = async(school) => {
    const SQL = 'INSERT INTO schools(name) values ($1) returning *';
    return (await client.query(SQL, [school.name])).rows[0];
};

const readTable = async(table) => {
    const SQL = `SELECT * FROM ${ table }`;
    return (await client.query(SQL)).rows;
};

module.exports = {
    sync,
    createSchool,
    readTable
};