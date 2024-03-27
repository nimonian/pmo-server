import express from 'express'
import projectRouter from './projects.js'

const api = express.Router()

api.use('/projects', projectRouter)

export default api
