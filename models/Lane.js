import db from '../db/index.js'
import Task from './Task.js'

class Lane {
  constructor(data, tasks = []) {
    this.id = data.id
    this.projectId = data.project_id
    this.title = data.title
    this.description = data.description
    this.order = data.order_index
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
    this.tasks = tasks
  }

  static async create(projectId, payload) {
    const data = await db('lanes')
      .insert({ ...payload, project_id: projectId })
      .returning('*')

    return new Lane(data[0])
  }

  static async findById(id) {
    const data = await db('lanes').where({ id }).first()
    return new Lane(data)
  }

  static async findByProject(project) {
    const rows = await db('lanes')
      .select()
      .where({ project_id: project.id })
      .orderBy('order_index')

    const lanes = rows.map(data => new Lane(data))

    const tasks = await Task.findByProject(project)

    for (const lane of lanes) {
      lane.tasks = tasks.filter(task => task.laneId === lane.id)
    }

    return lanes
  }

  static async updateOrder(lanes) {
    const transaction = await db.transaction()
    try {
      for (const lane of lanes) {
        await transaction('lanes')
          .where({ id: lane.id })
          .update({ order_index: lane.order })
      }
      await transaction.commit()
    } catch (err) {
      console.error(err)
      await transaction.rollback()
    }
  }
}

export default Lane
