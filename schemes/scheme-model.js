const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
};

//
//Return array of all users
function find() {
    return db('schemes');
}

//
//Return a single Scheme based on scheme id
function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

//
//Return an array of steps based on scheme ID
function findSteps(id) {
    return db
        .select('scheme_name', 'step_number', 'instructions')
        .table('schemes')
        .where('schemes.id', id)
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .orderBy('steps.step_number');
}

//
//
