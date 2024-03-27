/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = knex => {
  return knex.schema.createTable('columns', function (table) {
    table.increments('id').primary() // Primary key for the kanban_columns table.
    table.string('title', 255).notNullable() // Column title.
    table.integer('order_index').notNullable() // To keep track of the column's order in the UI.
    table.integer('project_id').unsigned().notNullable() // Foreign key to the projects table.

    // Define the foreign key constraint to the projects table.
    table
      .foreign('project_id')
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')

    table.timestamps(true, true) // Adds created_at and updated_at timestamps.
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = knex => {
  return knex.schema.dropTable('columns')
}
