const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
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
//Insert a new scheme into the database
function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(([id]) => this.findById(id));
}

//
//Remove scheme by ID
async function remove(id) {
    let schemeToDelete = await db('schemes')
        .where({ id })
        .first();
    await db('schemes')
        .where({ id })
        .del();
    return Promise.resolve(schemeToDelete);
}
