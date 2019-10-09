const knex = require('knex');
const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep,
    getStepsCount,
};

//
//Return array of all schemes
function find(searchString) {
    let query = db('schemes');

    if (searchString) {
        return query.where('scheme_name', 'like', `%${searchString}%`);
    }

    return query;
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
//Insert a new step with a project id associated
async function addStep(step, scheme_id) {
    await db('steps').insert({ ...step, scheme_id });
    return this.findSteps(scheme_id);
}

//
//Update a given scheme
async function update(changes, id) {
    await db('schemes')
        .update(changes)
        .where({ id });

    return this.findById(id);
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

//
//Get count of steps grouped by scheme
function getStepsCount() {
    return db
        .select('scheme_name')
        .from('schemes')
        .join('steps', 'steps.scheme_id', 'schemes.id')
        .count('scheme_id as steps')
        .groupBy('scheme_name');
}
