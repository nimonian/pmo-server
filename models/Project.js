import db from '../db/index.js'

class Project {
  static async findAll() {
    return db('projects').select()
  }

  static async findById(id) {
    const project = await db('projects').where({ id }).first()

    if (!project) {
      throw new Error('Project not found')
    }

    const rows = await db('lanes')
      .leftJoin('tasks', 'lanes.id', 'tasks.lane_id')
      .select(
        'lanes.id as lane_id',
        'lanes.title as lane_title',
        'lanes.order_index as lane_order',
        'tasks.id as task_id',
        'tasks.title as task_title',
        'tasks.order_index as task_order',
        'tasks.description as task_description',
        'tasks.status'
      )
      .where({ project_id: id })
      .orderBy('lane_order', 'asc')
      .orderBy('task_order', 'asc')

    project.lanes = []

    for (const row of rows) {
      let lane = project.lanes.find(l => l.id === row.lane_id)

      if (!lane) {
        lane = {
          id: row.lane_id,
          title: row.lane_title,
          order: row.lane_order,
          tasks: []
        }
        project.lanes.push(lane)
      }

      if (row.task_id) {
        lane.tasks.push({
          id: row.task_id,
          title: row.task_title,
          order: row.task_order,
          description: row.task_description,
          status: row.status
        })
      }
    }

    return project
  }

  static async create(project) {
    return db('projects').insert(project)
  }

  static async updateLaneOrder(lanes) {
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

  static async updateTaskOrder(lanes) {
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

export default Project
