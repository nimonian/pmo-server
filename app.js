import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import './db/config.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.send({ pong: new Date() })
})

app.listen(process.env.PORT, () =>
  console.log(`Server listening on ${process.env.PORT}`)
)
