/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex => {
  await knex.schema.createTable('projects', table => {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.text('description').nullable()
    table.boolean('is_active').notNullable().defaultTo(true)
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => {
  await knex.schema.dropTable('projects')
}
