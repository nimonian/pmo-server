import express from 'express'
import Project from '../models/Project.js'
import Lane from '../models/Lane.js'
import Task from '../models/Task.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const projects = await Project.findAll()
  res.json(projects)
})

router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id)
  res.json(project)
})

router.put('/lanes/order', async (req, res) => {
  const lanes = req.body
  try {
    await Lane.updateOrder(lanes)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

router.put('/tasks/order', async (req, res) => {
  const lanes = req.body
  try {
    await Task.updateOrder(lanes)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

router.post('/:id/lanes', async (req, res) => {
  try {
    const lane = await Lane.create(req.params.id, req.body)
    res.json(lane)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

export default router
