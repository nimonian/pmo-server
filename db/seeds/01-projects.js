/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('projects').del()

  // Inserts seed entries
  await knex('projects').insert([
    {
      id: 1,
      title: 'Project 1',
      description: 'Description for project 1',
      is_active: true
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description for project 2',
      is_active: true
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Description for project 3',
      is_active: false
    }
  ])
}
