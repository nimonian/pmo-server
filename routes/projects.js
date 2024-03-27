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

router.get('/:id/columns', async (req, res) => {
  const columns = await Project.findColumns(req.params.id)
  res.json(columns)
})

export default router
