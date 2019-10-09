exports.up = function(knex) {
    return knex.schema.table('schemes', t => {
        t.string('desciption')
            .notNullable()
            .default('none')
            .comment('A decsription of the scheme name');
    });
};

exports.down = function(knex) {
    return knex.schema.table('schemes', t => {
        t.dropColumns('description');
    });
};
