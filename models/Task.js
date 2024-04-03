import db from '../db/index.js'

class Task {
  constructor(data) {
    this.id = data.id
    this.laneId = data.lane_id
    this.title = data.title
    this.description = data.description
    this.status = data.status
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
    this.order = data.order_index
    this.dueDate = data.due_date
  }

  static async findByProject(project) {
    const rows = await db('lanes')
      .innerJoin('tasks', 'lanes.id', 'tasks.lane_id')
      .select(
        'lanes.id as lane_id',
        'tasks.id as id',
        'tasks.title as title',
        'tasks.description as description',
        'tasks.status',
        'tasks.created_at as created_at',
        'tasks.updated_at as updated_at',
        'tasks.order_index as order_index',
        'tasks.due_date as due_date'
      )
      .where({ project_id: project.id })
      .orderBy('order_index', 'asc')

    const tasks = rows.map(row => new Task(row))

    return tasks
  }

  static async updateOrder(lanes) {
    const transaction = await db.transaction()
    try {
      for (const lane of lanes) {
        for (const task of lane.tasks) {
          await transaction('tasks')
            .where({ id: task.id })
            .update({ order_index: task.order, lane_id: lane.id })
        }
      }
      await transaction.commit()
    } catch (err) {
      console.error(err)
      await transaction.rollback()
    }
  }
}

export default Task
