/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async knex => {
  // Deletes ALL existing entries
  await knex('columns').del()

  // Inserts seed entries
  await knex('columns').insert([
    {
      project_id: 1,
      title: 'To do',
      order_index: 1
    },
    {
      project_id: 1,
      title: 'In progress',
      order_index: 2
    },
    {
      project_id: 1,
      title: 'Done',
      order_index: 3
    },
    {
      project_id: 2,
      title: 'To do',
      order_index: 1
    },
    {
      project_id: 2,
      title: 'In progress',
      order_index: 2
    },
    {
      project_id: 2,
      title: 'Done',
      order_index: 3
    },
    {
      project_id: 3,
      title: 'To do',
      order_index: 1
    },
    {
      project_id: 3,
      title: 'In progress',
      order_index: 2
    },
    {
      project_id: 3,
      title: 'Done',
      order_index: 3
    }
  ])
}
