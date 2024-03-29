import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import api from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.send({ pong: new Date() })
})

app.use('/api', api)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.info(`Server listening on ${PORT}`))
