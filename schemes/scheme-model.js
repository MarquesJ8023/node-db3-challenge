const db = require('../data/dbConfig.js');

module.exports = {
find,
findById,
findSteps,
add,
addStep,
update,
remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findSteps(scheme_id) {
    return db('schemes as s')
    .join('steps as st', 's.id', 'st.scheme_id')
    .select('s.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .orderBy('st.step_number')
    .where({scheme_id})
}

function add(scheme) {
    return db('schemes')
    .insert(scheme)
    .then(id => {
        return findById(id[0]);
    })
};

function addStep(step) {
    return db('schemes')
    .insert(step)
    .then(id => {
        return findById(id[0]);
    })
}

function update(id, changes) {
    return db('schemes')
    .where({id})
    .update(changes)
    .then(count => {
        return findById(id)
    })
}

function remove(id) {
    return db('schemes')
    .where({id})
    .del()
}