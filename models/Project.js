import db from '../db/index.js'
import Lane from './Lane.js'
import Task from './Task.js'

class Project {
  constructor(data, lanes = []) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
    this.lanes = lanes
  }

  static async findAll() {
    const rows = await db('projects').select()
    return rows.map(data => new Project(data))
  }

  static async findById(id) {
    const data = await db('projects').where({ id }).first()

    if (!data) {
      throw new Error('Project not found')
    }

    const project = new Project(data)
    project.lanes = await Lane.findByProject(project)

    return project
  }

  static async create(project) {
    return db('projects').insert(project)
  }
}

export default Project
