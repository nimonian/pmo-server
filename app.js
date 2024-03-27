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

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
)
