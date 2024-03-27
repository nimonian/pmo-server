import db from '../db/index.js'

class Project {
  static async findAll() {
    return db('projects').select()
  }

  static async findById(id) {
    return db('projects').where({ id }).first()
  }

  static async findColumns(id) {
    const columns = await db('columns').where({ project_id: id })
    columns.sort((a, b) => a.order_index - b.order_index)
    return columns
  }

  static async create(project) {
    return db('projects').insert(project)
  }

  static async update(id, project) {}
}

export default Project
