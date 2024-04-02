import express from 'express'
import Project from '../models/Project.js'

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
    await Project.updateLaneOrder(lanes)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

router.put('/tasks/order', async (req, res) => {
  const lanes = req.body
  console.log(lanes)
  try {
    await Project.updateTaskOrder(lanes)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

export default router
